import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon from 'argon2';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const id = uuidv4();
    const hash = await argon.hash(createUserDto.password);
    const newUser: User = {
      id,
      login: createUserDto.login,
      password: hash,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    delete newUser.password;
    return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(userId: string) {
    if (uuidValidate(userId)) {
      const user: User = this.users.find(user => user.id === userId);
      if (user) {
        const index = this.users.indexOf(user);
        this.users.splice(index, 1);
        return 'The user has been deleted';
      } else throw new NotFoundException();
    } else throw new BadRequestException();
  }
}
