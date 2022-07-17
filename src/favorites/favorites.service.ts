import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';

import { Favorites } from './entities/favorite.entity';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { Track } from '../tracks/entities/track.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';

const NO_EXISTING_CODE = 422;

export type FavoritesResponse = {
  artists: string[] | Artist[];
  albums: string[] | Album[];
  tracks: string[] | Track[];
};

@Injectable()
export class FavoritesService {
  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
    private readonly artistsService: ArtistsService,
  ) {}

  public async addTrack(id: string): Promise<string> {
    if (uuidValidate(id)) {
      try {
        await this.tracksService.findOne(id);
        await this.favorites.tracks.push(id);
        return 'Added successfully';
      } catch (err) {
        throw new HttpException(
          {
            status: NO_EXISTING_CODE,
            error: "Track with id doesn't exist.",
          },
          NO_EXISTING_CODE,
        );
      }
    } else throw new BadRequestException();
  }

  public async addAlbum(id: string): Promise<string> {
    if (uuidValidate(id)) {
      try {
        await this.albumsService.findOne(id);
        await this.favorites.albums.push(id);
        return 'Added successfully';
      } catch (err) {
        throw new HttpException(
          {
            status: NO_EXISTING_CODE,
            error: "Album with id doesn't exist.",
          },
          NO_EXISTING_CODE,
        );
      }
    } else throw new BadRequestException();
  }

  public async addArtist(id: string): Promise<string> {
    if (uuidValidate(id)) {
      try {
        await this.artistsService.findOne(id);
        await this.favorites.artists.push(id);
        return 'Added successfully';
      } catch (err) {
        throw new HttpException(
          {
            status: NO_EXISTING_CODE,
            error: "Artist with id doesn't exist.",
          },
          NO_EXISTING_CODE,
        );
      }
    } else throw new BadRequestException();
  }

  public async findAll(): Promise<FavoritesResponse> {
    const favorites: FavoritesResponse = {
      artists: [...this.favorites.artists],
      tracks: [...this.favorites.tracks],
      albums: [...this.favorites.albums],
    };
    try {
      favorites.tracks = await Promise.all(
        favorites.tracks.map((trackId) => this.tracksService.findOne(trackId)),
      );
      favorites.albums = await Promise.all(
        favorites.albums.map((albumId) => this.albumsService.findOne(albumId)),
      );
      favorites.artists = await Promise.all(
        favorites.artists.map((artistId) =>
          this.artistsService.findOne(artistId),
        ),
      );
      return favorites;
    } catch (err) {
      return favorites;
    }
  }

  public removeTrack(id: string): string {
    if (uuidValidate(id)) {
      const trackId: string = this.favorites.tracks.find(
        (trackId) => trackId === id,
      );
      if (trackId) {
        const index = this.favorites.tracks.indexOf(trackId);
        this.favorites.tracks.splice(index, 1);
        return 'The track has been deleted';
      } else throw new NotFoundException();
    } else throw new BadRequestException();
  }

  public removeAlbum(id: string): string {
    if (uuidValidate(id)) {
      const albumId: string = this.favorites.albums.find(
        (albumId) => albumId === id,
      );
      if (albumId) {
        const index = this.favorites.albums.indexOf(albumId);
        this.favorites.albums.splice(index, 1);
        return 'The track has been deleted';
      } else throw new NotFoundException();
    } else throw new BadRequestException();
  }

  public removeArtist(id: string): string {
    if (uuidValidate(id)) {
      const artistId: string = this.favorites.artists.find(
        (artistId) => artistId === id,
      );
      if (artistId) {
        const index = this.favorites.artists.indexOf(artistId);
        this.favorites.artists.splice(index, 1);
        return 'The track has been deleted';
      } else throw new NotFoundException();
    } else throw new BadRequestException();
  }
}
