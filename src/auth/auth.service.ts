import { ForbiddenException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

import { JwtService } from '@nestjs/jwt';
import { Tokens } from './entities/tokens.entity';

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

  public async login(createUserDto: CreateUserDto): Promise<Tokens> {
    const users: User[] = await this.prisma.user.findMany();
    const user = users.find((user) => user.login === createUserDto.login);

    if (user && user.password === createUserDto.password) {
      const payload = { id: user.id, login: user.login };
      const accessTokenOptions = {
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
        secret: process.env.JWT_SECRET_KEY,
      };
      const refreshTokenOptions = {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      };
      const accessToken = await this.jwtService.signAsync(
        payload,
        accessTokenOptions,
      );
      const refreshToken = await this.jwtService.signAsync(
        payload,
        refreshTokenOptions,
      );

      return {
        accessToken,
        refreshToken,
      };
    } else throw new ForbiddenException();
  }
}
