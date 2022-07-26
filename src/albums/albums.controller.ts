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

import { AlbumsService } from './albums.service';
import { CreateUpdateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';

const ALBUM_EXAMPLE = {
  name: 'string',
  year: 2015,
  artistId: 'c47daf6f-59ba-4a06-a578-2334fa1502dd',
};

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @ApiOperation({
    summary: 'create new album',
    description: 'Creates a new album.',
  })
  @ApiCreatedResponse({
    description: 'The album has been created.',
    schema: {
      example: ALBUM_EXAMPLE,
    },
  })
  @ApiBadRequestResponse({
    description:
      'Bad request. Body does not contain required fields. The fields are not required types.',
  })
  create(@Body() createUpdateAlbumDto: CreateUpdateAlbumDto): Promise<Album> {
    return this.albumsService.create(createUpdateAlbumDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all albums', description: 'Gets all albums.' })
  @ApiOkResponse({
    description: 'Successful operation.',
    schema: {
      example: [ALBUM_EXAMPLE],
    },
  })
  findAll(): Promise<Album[]> {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get single album by id',
    description: 'Gets single album by id.',
  })
  @ApiOkResponse({
    description: 'Successful operation.',
    schema: {
      example: ALBUM_EXAMPLE,
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'Album not found.' })
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Album {
    return this.albumsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'update album info',
    description: 'Updates library album information by UUID.',
  })
  @ApiOkResponse({
    description: 'The album has been updated.',
    schema: {
      example: ALBUM_EXAMPLE,
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'Album not found.' })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() createUpdateAlbumDto: CreateUpdateAlbumDto,
  ): Promise<Album> {
    return this.albumsService.update(id, createUpdateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'delete album',
    description: 'Deletes album by ID.',
  })
  @ApiNoContentResponse({
    description: 'The album has been deleted.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'Album not found.' })
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<string> {
    return this.albumsService.remove(id);
  }
}
