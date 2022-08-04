import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Signup', description: 'Creates a new user.' })
  @ApiCreatedResponse({
    description: 'Successful signup.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  signup(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<string> {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description:
      'Logins a user and returns Access token and Refresh token (optionally).',
  })
  @ApiOkResponse({
    description: 'Successful operation.',
  })
  @ApiForbiddenResponse({
    description: 'Bad request.',
  })
  login(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<string> {
    return this.authService.login(createUserDto);
  }
}
