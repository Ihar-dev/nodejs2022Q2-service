import { ForbiddenException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private jwtService: JwtService = new JwtService();

  constructor(private readonly prisma: PrismaService) {}

  public async signup(createUserDto: CreateUserDto): Promise<string> {
    await this.prisma.user.create({
      data: {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ...createUserDto,
      },
    });

    return 'Successful signup.';
  }

  public async login(createUserDto: CreateUserDto): Promise<string> {
    const users: User[] = await this.prisma.user.findMany();
    const user = users.find((user) => user.login === createUserDto.login);

    if (user) {
      const payload = { id: user.id, login: user.login };
      const options = {
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
        secret: process.env.JWT_SECRET_KEY,
      };
      return this.jwtService.sign(payload, options);
    } else throw new ForbiddenException();
  }
}
