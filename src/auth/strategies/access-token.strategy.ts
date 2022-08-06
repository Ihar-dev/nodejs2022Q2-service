import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';

import { AuthService } from '../auth.service';
import { Payload } from '../entities/payload.entity';
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: Request): Promise<Payload> {
    const authorization = req.get('authorization');
    if (!authorization) throw new UnauthorizedException();

    const accessToken = authorization.replace('Bearer ', '');
    if (!accessToken) throw new UnauthorizedException();

    return this.authService.verifyAccessToken({ accessToken });
  }
}
