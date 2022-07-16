import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
//import * as argon from 'argon2';

import { CreateUserDto, UpdatePasswordDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  public findAll(): User[] {
    return this.users;
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const id = uuidv4();
    //const hash = await argon.hash(createUserDto.password);
    const newUser: User = {
      id,
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return this.getUserWithoutPassword(newUser);
  }

  findOne(userId: string): User {
    if (uuidValidate(userId)) {
      const user: User = this.users.find((user) => user.id === userId);
      if (user) return this.getUserWithoutPassword(user);
      else throw new NotFoundException();
    } else throw new BadRequestException();
  }

  public async update(
    userId: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    if (uuidValidate(userId)) {
      const user: User = this.users.find((user) => user.id === userId);
      if (user) {
        if (updatePasswordDto.oldPassword === user.password) {
          user.password = updatePasswordDto.newPassword;
          user.version++;
          user.updatedAt = Date.now();
          return this.getUserWithoutPassword(user);
        } else throw new ForbiddenException();
      } else throw new NotFoundException();
    } else throw new BadRequestException();
  }

  public async remove(userId: string): Promise<string> {
    if (uuidValidate(userId)) {
      const user: User = this.users.find((user) => user.id === userId);
      if (user) {
        const index = this.users.indexOf(user);
        this.users.splice(index, 1);
        return 'The user has been deleted';
      } else throw new NotFoundException();
    } else throw new BadRequestException();
  }

  private getUserWithoutPassword(user: User): User {
    const newUser = { ...user };
    delete newUser.password;
    return newUser;
  }
}
