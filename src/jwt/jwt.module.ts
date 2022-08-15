import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

@Module({
  imports: [AuthModule],
  exports: [AccessTokenGuard],
  providers: [AccessTokenGuard, AccessTokenStrategy],
})
export class JwtModule {}
