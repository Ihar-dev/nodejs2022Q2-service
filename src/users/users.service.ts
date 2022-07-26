import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto, UpdatePasswordDto } from './dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(): Promise<User[]> {
    const users: User[] = await this.prisma.user.findMany();
    return users;
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser: User = await this.prisma.user.create({
      data: {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ...createUserDto,
      },
    });

    return this.getUserWithoutPassword(newUser);
  }

  public async findOne(userId: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) return this.getUserWithoutPassword(user);
    else throw new NotFoundException();
  }

  public async update(
    userId: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      if (updatePasswordDto.oldPassword === user.password) {
        user.password = updatePasswordDto.newPassword;
        user.version++;
        user.updatedAt = Date.now();

        const newUser = await this.prisma.user.update({
          where: { id: userId },
          data: { ...user },
        });

        return this.getUserWithoutPassword(newUser);
      } else throw new ForbiddenException();
    } else throw new NotFoundException();
  }

  public async remove(userId: string): Promise<string> {
    const user: User = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      await this.prisma.user.delete({
        where: { id: userId },
      });

      return 'The user has been deleted';
    } else throw new NotFoundException();
  }

  private getUserWithoutPassword(user: User): User {
    const newUser = { ...user };
    delete newUser.password;
    return newUser;
  }
}
