import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';

import { Favorites } from './entities/favorite.entity';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

const NO_EXISTING_CODE = 422;

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
        this.favorites.tracks.push(id);
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
        this.favorites.albums.push(id);
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
        this.favorites.artists.push(id);
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

  public async findAll(): Promise<Favorites> {
    return this.favorites;
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
