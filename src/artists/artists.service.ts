import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUpdateArtistDto } from './dto/create-update-artist.dto';
import { Artist } from './entities/artist.entity';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  private readonly artists: Artist[] = [];

  constructor(
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private readonly prisma: PrismaService,
  ) {}

  public async create(
    createUpdateArtistDto: CreateUpdateArtistDto,
  ): Promise<Artist> {
    const id = uuidv4();
    const newArtist: Artist = { id, ...createUpdateArtistDto };
    await this.artists.push(newArtist);
    return newArtist;
  }

  public async findAll(): Promise<Artist[]> {
    return this.artists;
  }

  public async findOne(id: string): Promise<Artist> {
    if (uuidValidate(id)) {
      const artist: Artist = this.artists.find((artist) => artist.id === id);
      if (artist) return artist;
      else throw new NotFoundException();
    } else throw new BadRequestException();
  }

  public async update(
    id: string,
    createUpdateArtistDto: CreateUpdateArtistDto,
  ): Promise<Artist> {
    if (uuidValidate(id)) {
      let artist: Artist = this.artists.find((artist) => artist.id === id);
      if (artist) {
        artist = { id, ...createUpdateArtistDto };
        return artist;
      } else throw new NotFoundException();
    } else throw new BadRequestException();
  }

  public async remove(id: string): Promise<string> {
    if (uuidValidate(id)) {
      const artist: Artist = this.artists.find((artist) => artist.id === id);
      if (artist) {
        const index = this.artists.indexOf(artist);
        this.artists.splice(index, 1);
        this.albumsService.removeArtist(id);
        this.tracksService.removeArtist(id);
        try {
          this.favoritesService.removeArtist(id);
        } catch (err) {}
        return 'The artist has been deleted';
      } else throw new NotFoundException();
    } else throw new BadRequestException();
  }
}
