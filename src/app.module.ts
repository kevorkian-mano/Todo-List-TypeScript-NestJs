import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv';


dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/todoapp', {
      retryWrites: true,
      w: 'majority',
    }),
    UsersModule,
    AuthModule,
    TodosModule,
  ],
})
export class AppModule {}
