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

  @Get()
  findAll(): Promise<Favorites> {
    return this.favoritesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(+id);
  }
}
