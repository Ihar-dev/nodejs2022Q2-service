import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({
    example: '0083684c-26d5-4e60-99cb-4e45cc27dbe1',
    description: 'Album id as UUID',
  })
  id?: string;

  @ApiProperty({ example: 'Innuendo' })
  name: string;

  @ApiProperty({ example: 2015 })
  year: number;

  @ApiProperty({ example: 'c47daf6f-59ba-4a06-a578-2334fa1502dd' })
  artistId: string | null;
}
