// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// export class RefreshJwtStrategy extends PassportStrategy(
//   Strategy,
//   'jwt-refresh',
// ) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
//       ignoreExpiration: false,
//       secretOrKey: "secretKey",
//     });
//   }

//   async validate(payload: any) {
//     return { user: payload.sub, username: payload.username };
//   }
// }


import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InfluencerService } from 'src/influencer/influencer.service';

// @Injectable()
// export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
//   constructor(private configService: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
//       ignoreExpiration: false,
//       secretOrKey: configService.get<string>('REFRESH_JWT_SECRET'), // Separate secret for refresh token
//     });
//   }

//   async validate(payload: any) {
//     return { userId: payload.sub, username: payload.username };
//   }
// }


@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private configService: ConfigService,
    private influencerService: InfluencerService, // Inject InfluencerService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('REFRESH_JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const influencer = await this.influencerService.findOneById(payload.id);
    if (!influencer) {
      throw new UnauthorizedException();
    }
    return influencer; // Return the full influencer entity
  }
}
