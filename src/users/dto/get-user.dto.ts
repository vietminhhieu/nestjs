import { IsEmail } from 'class-validator';

export class GetAllUser {
  @IsEmail()
  email: string;
}
