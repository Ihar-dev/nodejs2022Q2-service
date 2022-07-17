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

import { ArtistsService } from './artists.service';
import { CreateUpdateArtistDto } from './dto/create-update-artist.dto';
import { Artist } from './entities/artist.entity';

const ARTIST_EXAMPLE = {
  id: '7e7896f1-efa1-40f4-a18e-c9aab8409006',
  name: 'Freddie Mercury',
  grammy: false,
};

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
    schema: {
      example: ARTIST_EXAMPLE,
    },
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
    schema: {
      example: [ARTIST_EXAMPLE],
    },
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
    schema: {
      example: ARTIST_EXAMPLE,
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'Artist not found.' })
  findOne(@Param('id') id: string): Promise<Artist> {
    return this.artistsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'update artist info',
    description: 'Update artist information by UUID.',
  })
  @ApiOkResponse({
    description: 'The artist has been updated.',
    schema: {
      example: ARTIST_EXAMPLE,
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'Artist not found.' })
  update(
    @Param('id') id: string,
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
  remove(@Param('id') id: string): Promise<string> {
    return this.artistsService.remove(id);
  }
}
