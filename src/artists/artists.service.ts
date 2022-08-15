import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUpdateArtistDto } from './dto/create-update-artist.dto';
import { Artist } from './entities/artist.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ArtistsService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(
    createUpdateArtistDto: CreateUpdateArtistDto,
  ): Promise<Artist> {
    const newArtist: Artist = await this.prisma.artist.create({
      data: createUpdateArtistDto,
    });
    return plainToInstance(Artist, newArtist);
  }

  public async findAll(): Promise<Artist[]> {
    const artists = await this.prisma.artist.findMany();
    return artists.map((artist) => plainToInstance(Artist, artist));
  }

  public async findOne(id: string): Promise<Artist> {
    const artist: Artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (artist) return plainToInstance(Artist, artist);
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
      return plainToInstance(Artist, newArtist);
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

      return 'The artist has been deleted';
    } else throw new NotFoundException();
  }
}
