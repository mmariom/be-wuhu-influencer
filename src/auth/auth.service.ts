// import { Injectable } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';
// import { Influencer } from 'src/influencer/entities/influencer.entity';
// import { InfluencerService } from 'src/influencer/influencer.service';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly influencerService: InfluencerService,
//     private jwtService: JwtService,
//   ) {}

//   async validateUser(username: string, password: string) {
//     const user = await this.influencerService.findOneWithUserName(username);
//     if (user && (await bcrypt.compare(password, user.password))) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

//   async login(influencer: Influencer) {
//     const payload = {
//       email: influencer.email,
//       first_name: influencer.firstName,
//       id: influencer.id
    
//     };

//     return {
//       accessToken: this.jwtService.sign(payload, { expiresIn: '15m' }),
//       refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
//     };
//   }

//   async refreshToken(influencer: Influencer) {
//     const payload = {
//       username: influencer.email,
//       sub: {
//         name: influencer.firstName,
//       },
//     };

//     return {
//       accessToken: this.jwtService.sign(payload),
//     };
//   }
// }


// import { Injectable } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';
// import { Influencer } from 'src/influencer/entities/influencer.entity';
// import { InfluencerService } from 'src/influencer/influencer.service';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly influencerService: InfluencerService,
//     private jwtService: JwtService,
//     private configService: ConfigService, // Inject ConfigService
//   ) {}

//   async validateUser(username: string, password: string) {
//     const user = await this.influencerService.findOneWithUserName(username);
//     if (user && (await bcrypt.compare(password, user.password))) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

//   async login(influencer: Influencer) {
//     const payload = {
//       email: influencer.email,
//       firstName: influencer.firstName,
//       id: influencer.id,
//       // Add roles or permissions if applicable
//     };

//     return {
//       accessToken: this.jwtService.sign(payload, {
//         expiresIn: this.configService.get<string>('JWT_EXPIRATION', '15m'),
//       }),
//       refreshToken: this.jwtService.sign({ id: influencer.id }, {
//         expiresIn: '7d', // You might also want to manage this through env variables
//       }),
//     };
//   }

//   async refreshToken(influencer: Influencer) {
//     const payload = {
//       email: influencer.email,
//       firstName: influencer.firstName,
//       id: influencer.id,
//       // Add roles or permissions if applicable
//     };

//     return {
//       accessToken: this.jwtService.sign(payload, {
//         expiresIn: this.configService.get<string>('JWT_EXPIRATION', '15m'),
//       }),
//     };
//   }
// }



import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Influencer } from 'src/influencer/entities/influencer.entity';
import { InfluencerService } from 'src/influencer/influencer.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly influencerService: InfluencerService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.influencerService.findOneByEmail(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(influencer: Influencer) {
    const payload = this.createTokenPayload(influencer);
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRATION', '15m'),
      }),
      refreshToken: this.jwtService.sign({ id: influencer.id }, {
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRATION', '7d'),
      }),
    };
  }

  async refreshToken(influencer: Influencer) {
    const payload = this.createTokenPayload(influencer);
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRATION', '15m'),
      }),

      refreshToken: this.jwtService.sign({ id: influencer.id }, {
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRATION', '7d'),
      }),
    };
  }
  

  

  private createTokenPayload(influencer: Influencer) {
    return {
      email: influencer.email,
      firstName: influencer.firstName,
      id: influencer.id,
      // Include additional necessary data (like roles, permissions) if needed
    };
  }
}
