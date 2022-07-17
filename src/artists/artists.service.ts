import { Injectable } from '@nestjs/common';
import { CreateUpdateArtistDto } from './dto/create-update-artist.dto';

@Injectable()
export class ArtistsService {
  create(createUpdateArtistDto: CreateUpdateArtistDto) {
    return 'This action adds a new artist';
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
