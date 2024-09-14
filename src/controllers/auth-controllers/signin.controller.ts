import { ErrorReturn } from '../../types/error-return';
import { Request, Response } from 'express';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { redisClient } from '../../lib/redis/client.redis';
import prismaClient from '../../lib/prisma/client.prisma';
import { ISession } from '../../types/express-session';
import sendEmail from '../../services/email-service/email.service';
import accountLockedTemplate from '../../services/email-service/templates/account-locked-template';

const { isEmail, isStrongPassword, normalizeEmail, escape } = validator;

const signInUser = async (req: Request, res: Response) => {
  let { email, password } = req.body;

  if (!isEmail(email)) {
    const error: ErrorReturn = {
      code: 400,
      message: 'Invalid email',
      params: ['email'],
    };
    return res.status(error.code).json(error);
  }

  if (!isStrongPassword(password)) {
    const error: ErrorReturn = {
      code: 400,
      message: 'Password not strong enough',
      params: ['password'],
    };
    return res.status(error.code).json(error);
  }

  email = escape(email).trim();
  email = normalizeEmail(email, { gmail_remove_dots: false });
  password = password.trim();

  const userDB = await prismaClient.user.findUnique({
    where: { email: email },
  });
  if (!userDB) {
    const error: ErrorReturn = {
      code: 404,
      message: 'User not found',
      params: ['email'],
    };
    return res.status(error.code).json(error);
  }

  const match = await bcrypt.compare(password, userDB.password);
  if (!match) {
    const timeout = 10;
    const response = await redisClient
      .multi()
      .incr(`${email}_attempts`)
      .expire(`${email}_attempts`, timeout)
      .exec();
    const attempts = response[0];

    if ((attempts as number) > 3) {
      await prismaClient.user.update({
        where: { email: email },
        data: { status: 'locked' },
      });

      const { text, html } = accountLockedTemplate(userDB.name, req.ip || '');
      await sendEmail(email, 'account locked', text, html);

      const error: ErrorReturn = {
        code: 400,
        message: 'Too many wrong attempts',
        params: ['password'],
      };
      return res.status(error.code).json(error);
    } else {
      const error: ErrorReturn = {
        code: 400,
        message: 'Wrong password',
        params: ['password'],
      };
      return res.status(error.code).json(error);
    }
  }

  try {
    (req.session as ISession).user = {
      id: userDB.id,
      email: userDB.email,
      clientId: req.socket.remoteAddress || '',
      agent: req.headers['user-agent'] || '',
    };

    redisClient.sAdd(`sessions:${userDB.email}`, req.sessionID);

    const user = {
      id: userDB.id,
      name: userDB.name,
      email: userDB.email,
    };

    return res.status(200).json(user);
  } catch (err) {
    const error: ErrorReturn = {
      code: (err as any).statusCode || (err as any).status || 500,
      message: (err as Error).message,
      stack: (err as Error).stack,
    };
    return res.status(error.code).json(error);
  }
};

export default signInUser;
