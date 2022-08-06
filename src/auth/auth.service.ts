import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './entities/tokens.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshAnswer } from './entities/refresh-answer.entity';
import { Payload } from './entities/payload.entity';

import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AccessTokenDto } from './dto/access-token.dto';

@Injectable()
export class AuthService {
  private jwtService: JwtService = new JwtService();

  constructor(
    private readonly prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  public async signup(createUserDto: CreateUserDto): Promise<string> {
    await this.usersService.create(createUserDto);
    return 'Successful signup.';
  }

  public async login(createUserDto: CreateUserDto): Promise<Tokens> {
    const users: User[] = await this.prisma.user.findMany();
    const user = users.find((user) => user.login === createUserDto.login);

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        createUserDto.password,
        user.password,
      );

      if (isPasswordCorrect) {
        const payload = { id: user.id, login: user.login };
        return this.getTokens(payload);
      } else throw new ForbiddenException();
    } else throw new ForbiddenException();
  }

  public async refresh(refreshTokenDto: RefreshTokenDto): Promise<Tokens> {
    if (refreshTokenDto.refreshToken) {
      try {
        const answer: RefreshAnswer = await this.jwtService.verifyAsync(
          refreshTokenDto.refreshToken,
          {
            secret: process.env.JWT_SECRET_REFRESH_KEY,
          },
        );

        const payload = { id: answer.id, login: answer.login };

        return this.getTokens(payload);
      } catch (err) {
        throw new ForbiddenException('Refresh token is invalid or expired.');
      }
    } else throw new UnauthorizedException();
  }

  public async verifyAccessToken(
    accessTokenDto: AccessTokenDto,
  ): Promise<Payload> {
    try {
      const answer: RefreshAnswer = await this.jwtService.verifyAsync(
        accessTokenDto.accessToken,
        {
          secret: process.env.JWT_SECRET_KEY,
        },
      );

      const payload = { id: answer.id, login: answer.login };

      return payload;
    } catch (err) {
      throw new UnauthorizedException('Access token is invalid or expired.');
    }
  }

  private async getTokens(payload: Payload): Promise<Tokens> {
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
  }
}
