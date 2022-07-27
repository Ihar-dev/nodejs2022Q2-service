import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Favorites } from './entities/favorite.entity';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { FavoritesResponse } from './entities/favorite-response.entity';
import { PrismaService } from 'src/prisma/prisma.service';

const NO_EXISTING_CODE = 422;

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    private readonly prisma: PrismaService,
  ) {}

  public async addTrack(id: string): Promise<string> {
    try {
      await this.tracksService.findOne(id);
      await this.updateFavorites('tracks', id);

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
  }

  public async addAlbum(id: string): Promise<string> {
    try {
      await this.albumsService.findOne(id);
      await this.updateFavorites('albums', id);

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
  }

  public async addArtist(id: string): Promise<string> {
    try {
      await this.artistsService.findOne(id);
      await this.updateFavorites('artists', id);
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
  }

  public async findAll(): Promise<FavoritesResponse> {
    const favorites: FavoritesResponse = {
      artists: [],
      tracks: [],
      albums: [],
    };

    const favoritesArray = await this.prisma.favorites.findMany();

    if (favoritesArray.length) {
      favorites.artists = [...favoritesArray[0].artists];
      favorites.tracks = [...favoritesArray[0].tracks];
      favorites.albums = [...favoritesArray[0].albums];

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
    }

    return favorites;
  }

  public removeTrack(id: string): Promise<string> {
    return this.removeFromFavorites('tracks', id);
  }

  public removeAlbum(id: string): Promise<string> {
    return this.removeFromFavorites('albums', id);
  }

  public async removeArtist(id: string): Promise<string> {
    return this.removeFromFavorites('artists', id);
  }

  private async removeFromFavorites(
    target: string,
    id: string,
  ): Promise<string> {
    const favoritesArray = await this.prisma.favorites.findMany();

    if (favoritesArray.length) {
      const favorites = favoritesArray[0];
      const favId = favorites.id;

      switch (target) {
        case 'artists':
          const artistId: string = favorites.artists.find(
            (artistId) => artistId === id,
          );

          if (artistId) {
            const index = favorites.artists.indexOf(artistId);
            favorites.artists.splice(index, 1);
          } // else throw new NotFoundException();
          break;
        case 'albums':
          const albumId: string = favorites.albums.find(
            (albumId) => albumId === id,
          );

          if (albumId) {
            const index = favorites.albums.indexOf(albumId);
            favorites.albums.splice(index, 1);
          } // else throw new NotFoundException();
          break;
        case 'tracks':
          const trackId: string = favorites.tracks.find(
            (trackId) => trackId === id,
          );

          if (trackId) {
            const index = favorites.tracks.indexOf(trackId);
            favorites.tracks.splice(index, 1);
          } // else throw new NotFoundException();
          break;
      }

      await this.prisma.favorites.update({
        where: { id: favId },
        data: favorites,
      });

      return 'The item has been deleted';
    } else throw new NotFoundException();
  }

  private async updateFavorites(
    target: string,
    id: string,
  ): Promise<Favorites> {
    const favoritesArray = await this.prisma.favorites.findMany();

    if (favoritesArray.length) {
      const favorites = favoritesArray[0];
      const favId = favorites.id;

      switch (target) {
        case 'artists':
          favorites.artists.push(id);
          break;
        case 'albums':
          favorites.albums.push(id);
          break;
        case 'tracks':
          favorites.tracks.push(id);
          break;
      }

      return this.prisma.favorites.update({
        where: { id: favId },
        data: favorites,
      });
    } else {
      const data = {
        artists: [],
        albums: [],
        tracks: [],
      };

      switch (target) {
        case 'artists':
          data.artists.push(id);
          break;
        case 'albums':
          data.albums.push(id);
          break;
        case 'tracks':
          data.tracks.push(id);
          break;
      }

      return this.prisma.favorites.create({ data });
    }
  }
}
