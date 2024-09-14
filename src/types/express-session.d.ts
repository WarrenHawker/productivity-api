import { UserRole, UserStatus } from '@prisma/client';
import { Session } from 'express-session';

interface ISession extends Session {
  user: {
    id: string;
    email: string;
    clientId: string;
    agent: string;
  };
}
