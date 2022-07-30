import { ApiProperty } from '@nestjs/swagger';
import { Track } from 'src/tracks/entities/track.entity';

export class Favorites {
  id?: string;

  @ApiProperty()
  artists: string[];

  @ApiProperty()
  albums: string[];

  @ApiProperty()
  tracks: Track[];

  favoriteId?: string;
}
