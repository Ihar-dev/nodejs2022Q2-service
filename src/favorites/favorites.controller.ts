import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { FavoritesService } from './favorites.service';
import { Favorites } from './entities/favorite.entity';

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
  addTrack(@Param('id') id: string): Promise<string> {
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
  addAlbum(@Param('id') id: string): Promise<string> {
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
  addArtist(@Param('id') id: string): Promise<string> {
    return this.favoritesService.addArtist(id);
  }

  @Get()
  findAll(): Promise<Favorites> {
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
  removeTrack(@Param('id') id: string): Promise<string> {
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
  removeAlbum(@Param('id') id: string): Promise<string> {
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
  removeArtist(@Param('id') id: string): Promise<string> {
    return this.favoritesService.removeArtist(id);
  }
}
