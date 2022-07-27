import { ApiProperty } from '@nestjs/swagger';

export class Favorites {
  id?: string;

  @ApiProperty()
  artists: string[];

  @ApiProperty()
  albums: string[];

  @ApiProperty()
  tracks: string[];
}
