import { ApiProperty } from '@nestjs/swagger';

import { Track } from '../../tracks/entities/track.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';

export class FavoritesResponse {
  @ApiProperty({
    example: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Freddie Mercury',
        grammy: false,
      },
    ],
  })
  artists: string[] | Artist[];

  @ApiProperty({
    example: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Innuendo',
        year: 1991,
        artistId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
    ],
  })
  albums: string[] | Album[];

  @ApiProperty({
    example: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'The Show Must Go On',
        artistId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        albumId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        duration: 262,
      },
    ],
  })
  tracks: string[] | Track[];
}
