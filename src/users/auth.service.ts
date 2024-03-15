import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(body: CreateUserDto) {
    const { email, password } = body;
    const user = await this.userService.find({ email });
    if (user.length) {
      throw new BadRequestException('Email have existed');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const newUser = await this.userService.create({ email, password: result });

    return newUser;
  }

  async signIn(body: CreateUserDto) {
    const { email, password } = body;
    const [user] = await this.userService.find({ email });
    if (!user) {
      throw new NotFoundException('Email is wrong');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Password is wrong ');
    }
    return user;
  }
}
