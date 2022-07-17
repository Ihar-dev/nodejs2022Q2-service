import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { Injectable } from '@nestjs/common';

import { CreateUpdateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  private readonly albums: Album[] = [];

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

  update(id: string, createUpdateAlbumDto: CreateUpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: string) {
    return `This action removes a #${id} album`;
  }
}
