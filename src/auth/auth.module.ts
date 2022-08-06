import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

@Module({
  imports: [UsersModule],
  exports: [AccessTokenGuard],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenGuard, AccessTokenStrategy],
})
export class AuthModule {}
