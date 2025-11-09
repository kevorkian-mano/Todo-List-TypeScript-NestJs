import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(dto: CreateTodoDto, ownerId: string) {
    const todo = new this.todoModel({ ...dto, owner: new Types.ObjectId(ownerId) });
    return todo.save();
  }

  async findAllForUser(user: { id: string; role: string }) {
    if (user.role === 'admin') return this.todoModel.find().exec();
    return this.todoModel.find({ owner: user.id }).exec();
  }

  async findById(id: string) {
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async update(id: string, update: UpdateTodoDto) {
    const todo = await this.todoModel.findByIdAndUpdate(id, update, { new: true }).exec();
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async remove(id: string) {
    const res = await this.todoModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Todo not found');
    return;
  }
}
