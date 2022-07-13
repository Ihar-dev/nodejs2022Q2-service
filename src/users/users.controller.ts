import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 201,
    description: 'The user has been created.',
    schema: {
      type: 'string',
      example: {
        id: 'de7018b5-a4d6-4bf8-9651-6a4574f373da',
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
  @ApiOperation({ summary: 'Create user', description: 'Creates a new user' })
  @Post()
  create(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
