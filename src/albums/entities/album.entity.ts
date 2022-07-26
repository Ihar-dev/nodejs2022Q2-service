import { ApiProperty } from '@nestjs/swagger';

export class Album {
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  artistId: string | null;
}
