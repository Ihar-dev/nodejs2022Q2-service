import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UsersController {
  @Get()
  getUsers() {
    return 'the users';
  }
}
