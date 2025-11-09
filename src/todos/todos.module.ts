import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]), UsersModule],
  providers: [TodosService],
  controllers: [TodosController],
  exports: [TodosService],
})
export class TodosModule {}
