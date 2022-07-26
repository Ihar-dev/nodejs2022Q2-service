import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
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
  private readonly albums: Album[] = [];

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
    const id = uuidv4();
    const newAlbum: Album = { id, ...createUpdateAlbumDto };
    await this.albums.push(newAlbum);
    return newAlbum;
  }

  public async findAll(): Promise<Album[]> {
    return this.albums;
  }

  public findOne(id: string): Album {
    const album: Album = this.albums.find((album) => album.id === id);
    if (album) return album;
    else throw new NotFoundException();
  }

  public async update(
    id: string,
    createUpdateAlbumDto: CreateUpdateAlbumDto,
  ): Promise<Album> {
    let album: Album = this.albums.find((album) => album.id === id);
    if (album) {
      album = { id, ...createUpdateAlbumDto };
      return album;
    } else throw new NotFoundException();
  }

  public async remove(id: string): Promise<string> {
    const album: Album = this.albums.find((album) => album.id === id);
    if (album) {
      const index = this.albums.indexOf(album);
      this.albums.splice(index, 1);
      await this.tracksService.removeAlbum(id);
      try {
        this.favoritesService.removeAlbum(id);
      } catch (err) {}
      return 'The track has been deleted';
    } else throw new NotFoundException();
  }

  public async removeArtist(id): Promise<void> {
    this.albums.forEach((album) => {
      if (album.artistId === id) album.artistId = null;
    });
  }
}
