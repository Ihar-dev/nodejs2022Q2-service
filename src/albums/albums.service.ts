import { Injectable } from '@nestjs/common';
import { CreateUpdateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumsService {
  create(createUpdateAlbumDto: CreateUpdateAlbumDto) {
    return 'This action adds a new album';
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
