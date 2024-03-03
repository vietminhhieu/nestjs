import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { GetAllUser } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @Get('/:id')
  async findUser(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Get()
  async findAllUsers(@Query() query: GetAllUser) {
    return await this.userService.find(query);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return await this.userService.update(id, body);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: number) {
    return await this.userService.remove(id);
  }
}
