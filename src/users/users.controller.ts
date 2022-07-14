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
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
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
    type: [User],
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
    type: User,
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
    type: User,
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

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+userId, updateUserDto);
  }

  //@HttpCode(204)
  @Delete(':userId')
  @ApiOperation({ summary: 'delete user', description: 'Deletes user by ID.' })
  @ApiNoContentResponse({
    description: 'The user has been deleted.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  remove(@Param('userId') userId: string): string {
    return this.usersService.remove(userId);
  }
}
