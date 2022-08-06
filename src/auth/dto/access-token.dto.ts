import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AccessTokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAyMzFlNmQxLTMyNGItNDI3Ni1hZTg2LTU0Yjg3ZjliNzRlYSIsImxvZ2luIjoicmV2ZWF3djQiLCJpYXQiOjE2NTk2NDkxMTYsImV4cCI6MTY1OTczNTUxNn0.EYmLsulhdr2zH_Off6wQBuk68KL9usV-DsJ3Ok3r5qA',
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
