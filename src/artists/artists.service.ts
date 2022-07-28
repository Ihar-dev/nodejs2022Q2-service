import {
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
    const newArtist: Artist = await this.prisma.artist.create({
      data: createUpdateArtistDto,
    });
    return newArtist;
  }

  public async findAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  public async findOne(id: string): Promise<Artist> {
    const artist: Artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (artist) return artist;
    else throw new NotFoundException();
  }

  public async update(
    id: string,
    createUpdateArtistDto: CreateUpdateArtistDto,
  ): Promise<Artist> {
    const artist: Artist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (artist) {
      const newArtist: Artist = await this.prisma.artist.update({
        where: { id },
        data: createUpdateArtistDto,
      });
      return newArtist;
    } else throw new NotFoundException();
  }

  public async remove(id: string): Promise<string> {
    const artist: Artist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (artist) {
      await this.prisma.artist.delete({
        where: { id },
      });

      //await this.tracksService.removeArtist(id);
      try {
        await this.favoritesService.removeArtist(id);
      } catch (err) {}
      return 'The artist has been deleted';
    } else throw new NotFoundException();
  }
}
