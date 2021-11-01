import { Injectable, SetMetadata } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GqlContext } from './auth.resolver';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          console.log(req.cookies);
          return (req.cookies['Authorization'] as string).replace(
            'Bearer ',
            '',
          );
        },
        (ctx: Request) => {
          return (
            (ctx as unknown as GqlContext).req.cookies[
              'Authorization'
            ] as string
          ).replace('Bearer ', '');
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'test-secret-dont-use-me-in-prod',
    });
  }

  async validate(payload: any) {
    return { userID: payload.sub, email: payload.email };
  }
}

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
