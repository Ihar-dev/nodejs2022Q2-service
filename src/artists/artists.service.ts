import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUpdateArtistDto } from './dto/create-update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  private readonly artists: Artist[] = [];

  public async create(
    createUpdateArtistDto: CreateUpdateArtistDto,
  ): Promise<Artist> {
    const id = uuidv4();
    const newArtist: Artist = { id, ...createUpdateArtistDto };
    this.artists.push(newArtist);
    return newArtist;
  }

  public async findAll(): Promise<Artist[]> {
    return this.artists;
  }

  findOne(id: number) {
    return `This action returns a #${id} artist`;
  }

  update(id: number, createUpdateArtistDto: CreateUpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  public async remove(id: string): Promise<string> {
    if (uuidValidate(id)) {
      const artist: Artist = this.artists.find((artist) => artist.id === id);
      if (artist) {
        const index = this.artists.indexOf(artist);
        this.artists.splice(index, 1);
        return 'The artist has been deleted';
      } else throw new NotFoundException();
    } else throw new BadRequestException();
  }
}
