import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const valid = await bcrypt.compare(password, (user as any).passwordHash);
    if (!valid) return null;
    return user;
  }

  async login(user: any) {
    const payload = { sub: user._id.toString(), role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
