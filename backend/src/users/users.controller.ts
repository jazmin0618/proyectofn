import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() { 
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() data: Partial<User>) {
    return this.usersService.create(data);
  }
}
