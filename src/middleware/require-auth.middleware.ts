import { NextFunction, Request, Response } from 'express';
import { ISession } from '../types/express-session';
import { ErrorReturn } from '../types/error-return';

export const checkSession = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const session = req.session as ISession;
    if (!session || !session.user) {
      const error: ErrorReturn = {
        code: 401,
        message: 'session not found',
      };
      return res.status(401).json(error);
    }
    next();
  };
};
