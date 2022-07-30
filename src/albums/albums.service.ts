import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUpdateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AlbumsService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(
    createUpdateAlbumDto: CreateUpdateAlbumDto,
  ): Promise<Album> {
    const newAlbum: Album = await this.prisma.album.create({
      data: createUpdateAlbumDto,
    });
    return plainToInstance(Album, newAlbum);
  }

  public async findAll(): Promise<Album[]> {
    const albums = await this.prisma.album.findMany();
    return albums.map((album) => plainToInstance(Album, album));
  }

  public async findOne(id: string): Promise<Album> {
    const album: Album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (album) return plainToInstance(Album, album);
    else throw new NotFoundException();
  }

  public async update(
    id: string,
    createUpdateAlbumDto: CreateUpdateAlbumDto,
  ): Promise<Album> {
    const album: Album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (album) {
      const newAlbum = await this.prisma.album.update({
        where: { id },
        data: createUpdateAlbumDto,
      });
      return plainToInstance(Album, newAlbum);
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

      return 'The album has been deleted';
    } else throw new NotFoundException();
  }
}
