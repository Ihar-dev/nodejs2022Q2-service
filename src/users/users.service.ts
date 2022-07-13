import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
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
      version: 1,
      createdAt: +Date.now(),
      updatedAt: +Date.now(),
    };
    const newDataBaseUser: User = JSON.parse(JSON.stringify(newUser));
    newDataBaseUser.password = hash;
    this.users.push(newDataBaseUser);
    return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
