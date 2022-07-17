import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { Injectable } from '@nestjs/common';

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

  findAll() {
    return `This action returns all artists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} artist`;
  }

  update(id: number, createUpdateArtistDto: CreateUpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
