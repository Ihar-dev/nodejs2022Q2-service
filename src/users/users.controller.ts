import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  UseGuards,
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
import { UpdatedUser } from './entities/updated-user.entity';
import { AccessTokenGuard } from 'src/jwt/guards/access-token.guard';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  @ApiOperation({ summary: 'get all users', description: 'Gets all users.' })
  @ApiOkResponse({
    description: 'Successful operation.',
    type: [User],
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get(':userId')
  @ApiOperation({
    summary: 'get single user by id',
    description: 'Gets single user by id.',
  })
  @ApiOkResponse({
    description: 'Successful operation.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  findOne(
    @Param('userId', new ParseUUIDPipe({ version: '4' })) userId: string,
  ): Promise<User> {
    return this.usersService.findOne(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  @ApiOperation({ summary: 'create user', description: 'Creates a new user.' })
  @ApiCreatedResponse({
    description: 'The user has been created.',
    type: User,
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

  @UseGuards(AccessTokenGuard)
  @Put(':userId')
  // eslint-disable-next-line prettier/prettier
  @ApiOperation({
    summary: "update user's password",
    description: "Updates a user's password by ID.",
  })
  @ApiOkResponse({
    description: 'The user has been updated.',
    type: UpdatedUser,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid).',
  })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiForbiddenResponse({ description: 'oldPassword is wrong.' })
  update(
    @Param('userId', new ParseUUIDPipe({ version: '4' })) userId: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    return this.usersService.update(userId, updatePasswordDto);
  }

  @UseGuards(AccessTokenGuard)
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
  remove(
    @Param('userId', new ParseUUIDPipe({ version: '4' })) userId: string,
  ): Promise<string> {
    return this.usersService.remove(userId);
  }
}
