import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  version: number;

  @ApiProperty()
  createdAt: number;

  @ApiProperty()
  updatedAt: number;
}
