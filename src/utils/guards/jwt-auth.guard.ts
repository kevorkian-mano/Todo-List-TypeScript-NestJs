import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Optionally override handleRequest to standardize errors
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err) throw err;
    if (!user) {
      // Throw unauthorized so client got 401
      const { UnauthorizedException } = require('@nestjs/common');
      throw new UnauthorizedException();
    }
    return user;
  }
}
