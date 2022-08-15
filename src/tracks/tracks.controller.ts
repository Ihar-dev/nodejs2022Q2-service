import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  ParseUUIDPipe,
  UseGuards,
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
import { CreateUpdateTrackDto } from './dto/create-update-track.dto';
import { Track } from './entities/track.entity';
import { AccessTokenGuard } from 'src/jwt/guards/access-token.guard';

@UseGuards(AccessTokenGuard)
@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @ApiOperation({ summary: 'get all tracks', description: 'Gets all tracks.' })
  @ApiOkResponse({
    description: 'Successful operation.',
    type: [Track],
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
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'Track not found.' })
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Track> {
    return this.tracksService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'create new track',
    description: 'Creates a new track.',
  })
  @ApiCreatedResponse({
    description: 'The track has been created.',
    type: Track,
  })
  @ApiBadRequestResponse({
    description:
      'Bad request. Body does not contain required fields. The fields are not required types.',
  })
  create(@Body() createUpdateTrackDto: CreateUpdateTrackDto): Promise<Track> {
    return this.tracksService.create(createUpdateTrackDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'update track info',
    description: 'Updates library track information by UUID.',
  })
  @ApiOkResponse({
    description: 'The track has been updated.',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'Track not found.' })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() createUpdateTrackDto: CreateUpdateTrackDto,
  ): Promise<Track> {
    return this.tracksService.update(id, createUpdateTrackDto);
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
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<string> {
    return this.tracksService.remove(id);
  }
}
