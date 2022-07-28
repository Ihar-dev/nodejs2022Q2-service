import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({
    example: '7e7896f1-efa1-40f4-a18e-c9aab8409006',
    description: 'Artist id as UUID',
  })
  id?: string;

  @ApiProperty({ example: 'Freddie Mercury' })
  name: string;

  @ApiProperty({ example: false })
  grammy: boolean;
}
