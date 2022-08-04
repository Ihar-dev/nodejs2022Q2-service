import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
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
  ) {
    return this.authService.signup(createUserDto);
  }
}
