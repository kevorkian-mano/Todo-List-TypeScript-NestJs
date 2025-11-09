import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { JwtAuthGuard } from '../utils/guards/jwt-auth.guard';
  import { TodosService } from './todos.service';
  import { CreateTodoDto } from './dto/create-todo.dto';
  import { UpdateTodoDto } from './dto/update-todo.dto';
  import { OwnerOrAdminGuard } from '../utils/guards/owner-or-admin.guard';
  
  @Controller('todos')
  export class TodosController {
    constructor(private readonly todosService: TodosService) {}
  
    // Auth required for creation/read (per your rules)
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() dto: CreateTodoDto, @Request() req: any) {
      return this.todosService.create(dto, req.user.id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req: any) {
      return this.todosService.findAllForUser(req.user);
    }
  
    // GET single todo — reading a specific todo is allowed for authenticated users,
    // but for non-admin we should return only if owner == req.user.id.
    @UseGuards(JwtAuthGuard, OwnerOrAdminGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.todosService.findById(id);
    }
  
    @UseGuards(JwtAuthGuard, OwnerOrAdminGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
      return this.todosService.update(id, dto);
    }
  
    @UseGuards(JwtAuthGuard, OwnerOrAdminGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.todosService.remove(id);
    }
  }
  