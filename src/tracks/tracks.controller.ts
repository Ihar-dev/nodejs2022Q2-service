import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { TracksService } from './tracks.service';
import { CreateTrackDto, UpdateTrackDto } from './dto';
import { Track } from './entities/track.entity';

const TRACK_EXAMPLE = {
  id: '566f9040-37b9-4170-849b-d867a3f009f4',
  name: 'The Show Must Go On',
  artistId: '92e0a93a-59ce-4220-8ef6-def797c2440e',
  albumId: '441f4f18-d265-4af2-8d54-2cb5d1e15b9b',
  duration: 123,
};

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @ApiOperation({ summary: 'get all tracks', description: 'Gets all tracks.' })
  @ApiOkResponse({
    description: 'Successful operation.',
    schema: {
      example: [TRACK_EXAMPLE],
    },
  })
  findAll(): Promise<Track[]> {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get single track by id',
    description: 'Gets single track by id.',
  })
  @ApiOkResponse({
    description: 'Successful operation.',
    schema: {
      example: TRACK_EXAMPLE,
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'Track not found.' })
  findOne(@Param('id') id: string): Promise<Track> {
    return this.tracksService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'create new track',
    description: 'Creates a new track.',
  })
  @ApiCreatedResponse({
    description: 'The track has been created.',
    schema: {
      example: TRACK_EXAMPLE,
    },
  })
  @ApiBadRequestResponse({
    description:
      'Bad request. Body does not contain required fields. The fields are not required types.',
  })
  create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'update track info',
    description: 'Updates library track information by UUID',
  })
  @ApiOkResponse({
    description: 'The track has been updated.',
    schema: {
      example: TRACK_EXAMPLE,
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'Track not found.' })
  update(
    @Param('id') id: string,
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<Track> {
    return this.tracksService.update(id, createTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'delete track',
    description: 'Deletes track by ID.',
  })
  @ApiNoContentResponse({
    description: 'The track has been deleted.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'Track not found.' })
  remove(@Param('id') id: string): Promise<string> {
    return this.tracksService.remove(id);
  }
}
