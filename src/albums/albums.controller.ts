import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
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
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() createUpdateAlbumDto: CreateUpdateAlbumDto,
  ) {
    return this.albumsService.update(id, createUpdateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumsService.remove(id);
  }
}
