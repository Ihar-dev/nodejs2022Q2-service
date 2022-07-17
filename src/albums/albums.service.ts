import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUpdateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class AlbumsService {
  private readonly albums: Album[] = [];

  constructor(private readonly tracksService: TracksService) {}

  public async create(
    createUpdateAlbumDto: CreateUpdateAlbumDto,
  ): Promise<Album> {
    const id = uuidv4();
    const newAlbum: Album = { id, ...createUpdateAlbumDto };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return `This action returns all albums`;
  }

  findOne(id: string) {
    return `This action returns a #${id} album`;
  }

  public async update(
    id: string,
    createUpdateAlbumDto: CreateUpdateAlbumDto,
  ): Promise<Album> {
    if (uuidValidate(id)) {
      let album: Album = this.albums.find((album) => album.id === id);
      if (album) {
        album = { id, ...createUpdateAlbumDto };
        return album;
      } else throw new NotFoundException();
    } else throw new BadRequestException();
  }

  public async remove(id: string): Promise<string> {
    if (uuidValidate(id)) {
      const album: Album = this.albums.find((album) => album.id === id);
      if (album) {
        const index = this.albums.indexOf(album);
        this.albums.splice(index, 1);
        this.tracksService.removeAlbum(id);
        return 'The track has been deleted';
      } else throw new NotFoundException();
    } else throw new BadRequestException();
  }

  public async removeArtist(id): Promise<void> {
    this.albums.forEach((album) => {
      if (album.artistId === id) album.artistId = null;
    });
  }
}
