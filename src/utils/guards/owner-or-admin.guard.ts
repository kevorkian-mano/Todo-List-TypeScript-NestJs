import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { TodosService } from '../../todos/todos.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class OwnerOrAdminGuard implements CanActivate {
  constructor(private todosService: TodosService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const id = req.params.id;
    // Admin bypass
    if (user && user.role === 'admin') return true;
    // Not admin -> must be owner of todo
    const todo = await this.todosService.findById(id);
    const ownerId = (todo.owner as any).toString ? todo.owner.toString() : String(todo.owner);
    if (ownerId === user.id) {
      return true;
    }
    throw new ForbiddenException('You do not own this resource');
  }
}
