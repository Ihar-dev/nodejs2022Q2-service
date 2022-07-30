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

import { ArtistsService } from './artists.service';
import { CreateUpdateArtistDto } from './dto/create-update-artist.dto';
import { Artist } from './entities/artist.entity';

@ApiTags('Artists')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @ApiOperation({
    summary: 'create new artist',
    description: 'Creates a new artist.',
  })
  @ApiCreatedResponse({
    description: 'The track has been created.',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description:
      'Bad request. Body does not contain required fields. The fields are not required types.',
  })
  create(
    @Body() createUpdateArtistDto: CreateUpdateArtistDto,
  ): Promise<Artist> {
    return this.artistsService.create(createUpdateArtistDto);
  }

  @Get()
  @ApiOperation({
    summary: 'get all artists',
    description: 'Gets all artists.',
  })
  @ApiOkResponse({
    description: 'Successful operation.',
    type: [Artist],
  })
  findAll(): Promise<Artist[]> {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get single artist by id',
    description: 'Gets single artist by id.',
  })
  @ApiOkResponse({
    description: 'Successful operation.',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'Artist not found.' })
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Artist> {
    return this.artistsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'update artist info',
    description: 'Update artist information by UUID.',
  })
  @ApiOkResponse({
    description: 'The artist has been updated.',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'Artist not found.' })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() createUpdateArtistDto: CreateUpdateArtistDto,
  ): Promise<Artist> {
    return this.artistsService.update(id, createUpdateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'delete artist',
    description: 'Deletes artist by ID.',
  })
  @ApiNoContentResponse({
    description: 'The artist has been deleted.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'Artist not found.' })
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<string> {
    return this.artistsService.remove(id);
  }
}
