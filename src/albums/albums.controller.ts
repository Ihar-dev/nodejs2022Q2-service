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
import { AccessTokenGuard } from 'src/jwt/guards/access-token.guard';

import { AlbumsService } from './albums.service';
import { CreateUpdateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';

@UseGuards(AccessTokenGuard)
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
    type: Album,
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
    type: [Album],
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
    type: Album,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'Album not found.' })
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Album> {
    return this.albumsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'update album info',
    description: 'Updates library album information by UUID.',
  })
  @ApiOkResponse({
    description: 'The album has been updated.',
    type: Album,
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
