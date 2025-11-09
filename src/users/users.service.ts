import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.userModel.findOne({ email: dto.email }).exec();
    if (existing) throw new ConflictException('Email already registered');

    const rounds = parseInt(process.env.BCRYPT_SALT_OR_ROUNDS || '10', 10);
    const passwordHash = await bcrypt.hash(dto.password, rounds);
    const created = new this.userModel({ email: dto.email, passwordHash });
    return (await created.save()).toObject();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}
