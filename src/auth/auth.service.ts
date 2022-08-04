import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  public async signup(createUserDto: CreateUserDto) {
    await this.prisma.user.create({
      data: {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ...createUserDto,
      },
    });

    return 'Successful signup.';
  }
}
