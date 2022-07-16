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

  public async findAll(): Promise<Track[]> {
    return this.tracks;
  }

  public async findOne(id: string): Promise<Track> {
    if (uuidValidate(id)) {
      const track: Track = this.tracks.find((track) => track.id === id);
      if (track) return track;
      else throw new NotFoundException();
    } else throw new BadRequestException();
  }

  public async update(
    id: string,
    createTrackDto: CreateTrackDto,
  ): Promise<Track> {
    if (uuidValidate(id)) {
      let track: Track = this.tracks.find((track) => track.id === id);
      if (track) {
        track = { id, ...createTrackDto };
        return track;
      } else throw new NotFoundException();
    } else throw new BadRequestException();
  }

  public async remove(id: string): Promise<string> {
    if (uuidValidate(id)) {
      const track: Track = this.tracks.find((track) => track.id === id);
      if (track) {
        const index = this.tracks.indexOf(track);
        this.tracks.splice(index, 1);
        return 'The track has been deleted';
      } else throw new NotFoundException();
    } else throw new BadRequestException();
  }
}
