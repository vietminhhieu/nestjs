import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  signUp(body: CreateUserDto) {
    console.log('body', body);
  }
}
