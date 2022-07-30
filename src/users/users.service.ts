import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto, UpdatePasswordDto } from './dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll(): Promise<User[]> {
    const users: User[] = await this.prisma.user.findMany();
    return users.map((user) => plainToInstance(User, user));
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser: User = await this.prisma.user.create({
      data: {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ...createUserDto,
      },
    });
    return plainToInstance(User, newUser);
  }

  public async findOne(userId: string): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) return plainToInstance(User, user);
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
          data: user,
        });

        return plainToInstance(User, newUser);
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
}
