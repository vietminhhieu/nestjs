import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { GetAllUser } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Serialize,
  SerializeInterceptor,
} from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/current-user.decorator';
import { CurrentUserInterceptor } from './interceptor/current-user.interceptor';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('who')
  @UseGuards(AuthGuard)
  who(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body);
    session.userId = user.id;
    return user;
  }

  @Post('/sign-in')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body);
    session.userId = user.id;
    return user;
  }

  @Post('sign-out')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @UseInterceptors(new SerializeInterceptor(UserDto))
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
