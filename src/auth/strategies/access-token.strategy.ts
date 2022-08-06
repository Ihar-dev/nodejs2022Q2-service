import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Payload } from '../entities/payload.entity';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  async validate(payload: Payload) {
    return payload;
  }
}
