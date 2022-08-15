import { ApiProperty } from '@nestjs/swagger';

export class Tokens {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAyMzFlNmQxLTMyNGItNDI3Ni1hZTg2LTU0Yjg3ZjliNzRlYSIsImxvZ2luIjoicmV2ZWF3djQiLCJpYXQiOjE2NTk2NDc2NTYsImV4cCI6MTY1OTY1MTI1Nn0.Iu8sWyUqFB4d08tqdWIy6cMf3KstdATYfxg4w5rFlw4',
  })
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAyMzFlNmQxLTMyNGItNDI3Ni1hZTg2LTU0Yjg3ZjliNzRlYSIsImxvZ2luIjoicmV2ZWF3djQiLCJpYXQiOjE2NTk2NDc2NTYsImV4cCI6MTY1OTczNDA1Nn0.LqTdARIESNBEmRW9wM1rdr0NaL3GstblbMS9Q_THyVM',
  })
  refreshToken: string;
}
