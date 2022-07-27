import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './entities/favorite-response.entity';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('track/:id')
  @ApiOperation({
    summary: 'add track to the favorites',
    description: 'Adds track to the favorites.',
  })
  @ApiCreatedResponse({
    description: 'Added successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid).',
  })
  @ApiResponse({
    status: 422,
    description: "Track with id doesn't exist.",
  })
  addTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<string> {
    return this.favoritesService.addTrack(id);
  }

  @Post('album/:id')
  @ApiOperation({
    summary: 'add album to the favorites',
    description: 'Adds album to the favorites.',
  })
  @ApiCreatedResponse({
    description: 'Added successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid).',
  })
  @ApiResponse({
    status: 422,
    description: "Album with id doesn't exist.",
  })
  addAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<string> {
    return this.favoritesService.addAlbum(id);
  }

  @Post('artist/:id')
  @ApiOperation({
    summary: 'add artist to the favorites',
    description: 'Adds artist to the favorites.',
  })
  @ApiCreatedResponse({
    description: 'Added successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid).',
  })
  @ApiResponse({
    status: 422,
    description: "Artist with id doesn't exist.",
  })
  addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<string> {
    return this.favoritesService.addArtist(id);
  }

  @Get()
  @ApiOperation({
    summary: 'get all favorites',
    description: 'Gets all favorites movies, tracks and books.',
  })
  @ApiOkResponse({
    description: 'Successful operation.',
    schema: {
      example: {
        artists: [
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            name: 'Freddie Mercury',
            grammy: false,
          },
        ],
        albums: [
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            name: 'Innuendo',
            year: 1991,
            artistId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          },
        ],
        tracks: [
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            name: 'The Show Must Go On',
            artistId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            albumId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            duration: 262,
          },
        ],
      },
    },
  })
  findAll(): Promise<FavoritesResponse> {
    return this.favoritesService.findAll();
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'delete track from favorites',
    description: 'Deletes track by ID.',
  })
  @ApiNoContentResponse({
    description: 'The track has been deleted.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'Track not found.' })
  removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<string> {
    return this.favoritesService.removeTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'delete album from favorites',
    description: 'Deletes album by ID.',
  })
  @ApiNoContentResponse({
    description: 'The album has been deleted.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'Album not found.' })
  removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<string> {
    return this.favoritesService.removeAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'delete artist from favorites',
    description: 'Deletes artist by ID.',
  })
  @ApiNoContentResponse({
    description: 'The artist has been deleted.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'Artist not found.' })
  removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<string> {
    return this.favoritesService.removeArtist(id);
  }
}
