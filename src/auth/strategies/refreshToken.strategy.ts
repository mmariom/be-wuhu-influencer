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
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from 'src/refresh-token/entities/refreshtoken.entity';
import { Repository } from 'typeorm';

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


// @Injectable()
// export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
//   constructor(
//     private configService: ConfigService,
//     private influencerService: InfluencerService, // Inject InfluencerService
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: configService.get<string>('REFRESH_JWT_SECRET'),
//     });
//   }

//   async validate(payload: any) {
//     const influencer = await this.influencerService.findOneById(payload.id);
//     if (!influencer) {
//       throw new UnauthorizedException();
//     }
//     return influencer; // Return the full influencer entity
//   }
// }


@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('REFRESH_JWT_SECRET'),
      passReqToCallback: true, // Allows the request to be passed to the validate method
    });
  }

  async validate(req, payload: any) {
    const refreshToken = req.headers['authorization']?.split(' ')[1];
    // Optionally, validate the refresh token against the database here
    const tokenRecord = await this.refreshTokenRepository.findOne({where: {token: refreshToken}});
    if (!tokenRecord || new Date() > tokenRecord.expiresAt) {
      throw new UnauthorizedException('Refresh token is invalid or expired.');
    }
    return { ...payload, refreshToken }; // Ensure payload includes necessary user identification
  }
}
