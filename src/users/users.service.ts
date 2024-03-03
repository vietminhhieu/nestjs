import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAllUser } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async create(body: CreateUserDto) {
    const { email, password } = body;
    const user = await this.userRepo.findOne({ where: { email } });
    if (user) {
      throw new BadRequestException('User existed');
    }
    const newUser = this.userRepo.create({ email, password });

    return this.userRepo.save(newUser);
  }

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  find(query: GetAllUser) {
    return this.userRepo.find({ where: query });
  }

  async update(id: number, body: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, body);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepo.delete({ id });
  }
}
