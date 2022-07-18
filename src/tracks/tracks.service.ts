import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUpdateTrackDto } from './dto/create-update-track.dto';
import { Track } from './entities/track.entity';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TracksService {
  private readonly tracks: Track[] = [];

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  public async create(
    createUpdateTrackDto: CreateUpdateTrackDto,
  ): Promise<Track> {
    const id = uuidv4();
    const newTrack: Track = { id, ...createUpdateTrackDto };
    await this.tracks.push(newTrack);
    return newTrack;
  }

  public async findAll(): Promise<Track[]> {
    return this.tracks;
  }

  public async findOne(id: string): Promise<Track> {
    if (uuidValidate(id)) {
      const track: Track = await this.tracks.find((track) => track.id === id);
      if (track) return track;
      else throw new NotFoundException();
    } else throw new BadRequestException();
  }

  public async update(
    id: string,
    createUpdateTrackDto: CreateUpdateTrackDto,
  ): Promise<Track> {
    if (uuidValidate(id)) {
      let track: Track = this.tracks.find((track) => track.id === id);
      if (track) {
        track = { id, ...createUpdateTrackDto };
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
        try {
          this.favoritesService.removeTrack(id);
          return 'The track has been deleted';
        } catch (err) {
          return 'The track has been deleted';
        }
      } else throw new NotFoundException();
    } else throw new BadRequestException();
  }

  public async removeArtist(id): Promise<void> {
    this.tracks.forEach((track) => {
      if (track.artistId === id) track.artistId = null;
    });
  }

  public async removeAlbum(id): Promise<void> {
    this.tracks.forEach((track) => {
      if (track.albumId === id) track.albumId = null;
    });
  }
}
