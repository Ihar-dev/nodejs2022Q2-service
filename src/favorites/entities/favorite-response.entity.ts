import { ApiProperty } from '@nestjs/swagger';

import { Track } from '../../tracks/entities/track.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';

export class FavoritesResponse {
  @ApiProperty()
  artists: string[] | Artist[];

  @ApiProperty()
  albums: string[] | Album[];

  @ApiProperty()
  tracks: string[] | Track[];
}
