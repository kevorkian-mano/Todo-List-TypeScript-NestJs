import { Body, Controller, HttpCode, HttpStatus, Post, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    // Remove passwordHash in response
    const { passwordHash, ...rest } = user as any;
    return { ...rest };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) throw new ConflictException('Invalid credentials'); // will be refined below
    return this.authService.login(user);
  }
}
