import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'TEST_LOGIN' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ example: 'Tu6!@#%&' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
