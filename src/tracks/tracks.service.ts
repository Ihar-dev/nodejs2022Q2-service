import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUpdateTrackDto } from './dto/create-update-track.dto';
import { Track } from './entities/track.entity';
import { FavoritesService } from '../favorites/favorites.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TracksService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private readonly prisma: PrismaService,
  ) {}

  public async create(
    createUpdateTrackDto: CreateUpdateTrackDto,
  ): Promise<Track> {
    const newTrack: Track = await this.prisma.track.create({
      data: createUpdateTrackDto,
    });
    return plainToInstance(Track, newTrack);
  }

  public async findAll(): Promise<Track[]> {
    const tracks = await this.prisma.track.findMany();
    return tracks.map((track) => plainToInstance(Track, track));
  }

  public async findOne(id: string): Promise<Track> {
    const track: Track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });

    if (track) return plainToInstance(Track, track);
    else throw new NotFoundException();
  }

  public async update(
    id: string,
    createUpdateTrackDto: CreateUpdateTrackDto,
  ): Promise<Track> {
    const track: Track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });

    if (track) {
      const newTrack = await this.prisma.track.update({
        where: { id },
        data: createUpdateTrackDto,
      });
      return plainToInstance(Track, newTrack);
    } else throw new NotFoundException();
  }

  public async remove(id: string): Promise<string> {
    const track: Track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (track) {
      await this.prisma.track.delete({
        where: { id },
      });
      try {
        // await this.favoritesService.removeTrack(id);
      } catch (err) {}
      return 'The track has been deleted';
    } else throw new NotFoundException();
  }

  public async removeArtist(id): Promise<void> {
    const tracks = await this.findAll();
    const track = tracks.find((track) => track.artistId === id);
    if (track) {
      track.artistId = null;
      await this.update(track.id, track);
    }
  }

  public async removeAlbum(id): Promise<void> {
    const tracks = await this.findAll();
    const track = tracks.find((track) => track.albumId === id);

    if (track) {
      track.albumId = null;
      await this.update(track.id, track);
    }
  }
}
