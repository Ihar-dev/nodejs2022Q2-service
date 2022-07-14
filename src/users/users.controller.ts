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
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The user has been created.',
    schema: {
      type: 'string',
      example: {
        userId: 'de7018b5-a4d6-4bf8-9651-6a4574f373da',
        login: 'TEST_LOGIN',
        version: 1,
        createAt: 1657746431528,
        updateAt: 1657746431528,
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Bad request. Body does not contain required fields. The fields are not strings.',
  })
  @ApiOperation({ summary: 'Create user', description: 'Creates a new user.' })
  create(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  /* @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(+userId);
  } */

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+userId, updateUserDto);
  }

  //@HttpCode(204)
  @Delete(':userId')
  @ApiResponse({
    status: 204,
    description: 'The user has been deleted.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiOperation({ summary: 'Delete user', description: 'Deletes user by ID.' })
  remove(@Param('userId') userId: string): string {
    return this.usersService.remove(userId);
  }
}
