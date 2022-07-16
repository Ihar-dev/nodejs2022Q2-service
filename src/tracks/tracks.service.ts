import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateTrackDto, UpdateTrackDto } from './dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  private readonly tracks: Track[] = [];

  public async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const id = uuidv4();
    const newTrack: Track = { id, ...createTrackDto };
    this.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return `This action returns all tracks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} track`;
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  public async remove(id: string): Promise<string> {
    if (uuidValidate(id)) {
      const track: Track = this.tracks.find((track) => track.id === id);
      if (track) {
        const index = this.tracks.indexOf(track);
        this.tracks.splice(index, 1);
        return 'The user has been deleted';
      } else throw new NotFoundException();
    } else throw new BadRequestException();
  }
}
