import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './entities/favorite-response.entity';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(AccessTokenGuard)
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

  @UseGuards(AccessTokenGuard)
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

  @UseGuards(AccessTokenGuard)
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

  @UseGuards(AccessTokenGuard)
  @Get()
  @ApiOperation({
    summary: 'get all favorites',
    description: 'Gets all favorites movies, tracks and books.',
  })
  @ApiOkResponse({
    description: 'Successful operation.',
    type: FavoritesResponse,
  })
  findAll(): Promise<FavoritesResponse> {
    return this.favoritesService.findAll();
  }

  @UseGuards(AccessTokenGuard)
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

  @UseGuards(AccessTokenGuard)
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

  @UseGuards(AccessTokenGuard)
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
