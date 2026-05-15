import { Request } from 'express';
import { JwtStrategy } from './jwt.strategy';

export type AuthenticatedRequest = Request & {
  user: JwtStrategy;
};
