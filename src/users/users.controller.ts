import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { User } from './entities/user.entity';

const USER_EXAMPLE = {
  id: 'de7018b5-a4d6-4bf8-9651-6a4574f373da',
  login: 'TEST_LOGIN',
  version: 1,
  createAt: 1657746431528,
  updateAt: 1657746431528,
};

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'get all users', description: 'Gets all users.' })
  @ApiOkResponse({
    description: 'Successful operation.',
    schema: {
      example: [USER_EXAMPLE],
    },
  })
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':userId')
  @ApiOperation({
    summary: 'get single user by id',
    description: 'Gets single user by id.',
  })
  @ApiOkResponse({
    description: 'Successful operation.',
    schema: {
      example: USER_EXAMPLE,
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(userId);
  }

  @Post()
  @ApiOperation({ summary: 'create user', description: 'Creates a new user.' })
  @ApiCreatedResponse({
    description: 'The user has been created.',
    schema: {
      example: USER_EXAMPLE,
    },
  })
  @ApiBadRequestResponse({
    description:
      'Bad request. Body does not contain required fields. The fields are not strings.',
  })
  create(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put(':userId')
  // eslint-disable-next-line prettier/prettier
  @ApiOperation({
    summary: "update user's password",
    description: "Updates a user's password by ID.",
  })
  @ApiOkResponse({
    description: 'The user has been updated.',
    schema: {
      example: {
        id: 'de7018b5-a4d6-4bf8-9651-6a4574f373da',
        login: 'TEST_LOGIN',
        version: 2,
        createAt: 1657746431528,
        updateAt: 1657834424839,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiForbiddenResponse({ description: 'oldPassword is wrong.' })
  update(
    @Param('userId') userId: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    return this.usersService.update(userId, updatePasswordDto);
  }

  @Delete(':userId')
  @HttpCode(204)
  @ApiOperation({ summary: 'delete user', description: 'Deletes user by ID.' })
  @ApiNoContentResponse({
    description: 'The user has been deleted.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  remove(@Param('userId') userId: string): Promise<string> {
    return this.usersService.remove(userId);
  }
}
