import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  @ApiProperty({
    example: 'de7018b5-a4d6-4bf8-9651-6a4574f373da',
    description: 'User id as UUID',
  })
  id?: string;

  @ApiProperty({
    example: 'TEST_LOGIN',
  })
  login: string;

  @Exclude()
  @ApiProperty({
    description: 'is not returned',
  })
  password: string;

  @ApiProperty({ example: 1 })
  version: number;

  @ApiProperty({ example: 1657746431528 })
  createdAt: number;

  @ApiProperty({ example: 1657746431528 })
  updatedAt: number;
}
