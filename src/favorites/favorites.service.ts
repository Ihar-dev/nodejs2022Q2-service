import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { FavoritesResponse } from './entities/favorite-response.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoritesRecord } from './entities/favorite-record.entity';

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
      const track = await this.prisma.track.findUnique({
        where: { id },
      });
      track.favoriteId = await this.getFavoriteId();
      await this.tracksService.update(id, track);

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
      const album = await this.prisma.album.findUnique({
        where: { id },
      });
      album.favoriteId = await this.getFavoriteId();
      await this.albumsService.update(id, album);

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
      const artist = await this.prisma.artist.findUnique({
        where: { id },
      });
      artist.favoriteId = await this.getFavoriteId();
      await this.artistsService.update(id, artist);

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
    const favorites: FavoritesResponse = this.getDefaultFavorites();
    const favoritesArray = await this.prisma.favorites.findMany();

    if (favoritesArray.length) {
      const favoritesRecord: FavoritesRecord = favoritesArray[0];
      const favoriteId = favoritesRecord.id;

      await Promise.all([
        (favorites.artists = await this.prisma.artist.findMany({
          where: { favoriteId },
        })),
        (favorites.albums = await this.prisma.album.findMany({
          where: { favoriteId },
        })),
        (favorites.tracks = await this.prisma.track.findMany({
          where: { favoriteId },
        })),
      ]);

      favorites.artists.map((artist) => delete artist.favoriteId);
      favorites.albums.map((album) => delete album.favoriteId);
      favorites.tracks.map((track) => delete track.favoriteId);
    }

    return favorites;
  }

  public async removeTrack(id: string): Promise<string> {
    try {
      const track = await this.prisma.track.findUnique({
        where: { id },
      });
      if (!track.favoriteId) throw new NotFoundException();
      track.favoriteId = null;
      await this.tracksService.update(id, track);

      return 'The track has been deleted';
    } catch (err) {
      throw new NotFoundException();
    }
  }

  public async removeAlbum(id: string): Promise<string> {
    try {
      const album = await this.prisma.album.findUnique({
        where: { id },
      });
      if (!album.favoriteId) throw new NotFoundException();
      album.favoriteId = null;
      await this.albumsService.update(id, album);

      return 'The album has been deleted';
    } catch (err) {
      throw new NotFoundException();
    }
  }

  public async removeArtist(id: string): Promise<string> {
    try {
      const artist = await this.prisma.artist.findUnique({
        where: { id },
      });
      if (!artist.favoriteId) throw new NotFoundException();
      artist.favoriteId = null;
      await this.artistsService.update(id, artist);

      return 'The artist has been deleted';
    } catch (err) {
      throw new NotFoundException();
    }
  }

  private async getFavoriteId(): Promise<string> {
    const favoritesArray = await this.prisma.favorites.findMany();
    let favoritesRecord: FavoritesRecord;
    if (favoritesArray.length) favoritesRecord = favoritesArray[0];
    else favoritesRecord = await this.prisma.favorites.create({ data: {} });
    const favoriteId = favoritesRecord.id;
    return favoriteId;
  }

  private getDefaultFavorites(): FavoritesResponse {
    return {
      artists: [],
      albums: [],
      tracks: [],
    };
  }
}
