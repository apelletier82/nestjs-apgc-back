import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUserList() {
    return this.usersService.getUserList();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() userDto: Partial<User>) {
    return this.usersService.createUser(
      userDto.username,
      userDto.fullName,
      userDto.email,
    );
  }

  @Put()
  updateUser(@Body() userDto: User) {
    return this.usersService.updateUser(userDto.id, userDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.deleteUser(userId);
  }
}
