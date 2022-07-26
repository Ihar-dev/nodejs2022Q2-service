import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUpdateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private readonly prisma: PrismaService,
  ) {}

  public async create(
    createUpdateAlbumDto: CreateUpdateAlbumDto,
  ): Promise<Album> {
    const newAlbum: Album = await this.prisma.album.create({
      data: createUpdateAlbumDto,
    });
    return newAlbum;
  }

  public async findAll(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  public async findOne(id: string): Promise<Album> {
    const album: Album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });

    if (album) return album;
    else throw new NotFoundException();
  }

  public async update(
    id: string,
    createUpdateAlbumDto: CreateUpdateAlbumDto,
  ): Promise<Album> {
    const album: Album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });

    if (album) {
      const newAlbum = await this.prisma.album.update({
        where: { id },
        data: createUpdateAlbumDto,
      });
      return newAlbum;
    } else throw new NotFoundException();
  }

  public async remove(id: string): Promise<string> {
    const album: Album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (album) {
      await this.prisma.album.delete({
        where: { id },
      });

      try {
        await this.tracksService.removeAlbum(id);
        this.favoritesService.removeAlbum(id);
      } catch (err) {}
      return 'The album has been deleted';
    } else throw new NotFoundException();
  }

  public async removeArtist(id): Promise<void> {
    const albums = await this.findAll();
    const album = albums.find((album) => album.artistId === id);

    if (album) {
      album.artistId = null;
      await this.update(album.id, album);
    }
  }
}
