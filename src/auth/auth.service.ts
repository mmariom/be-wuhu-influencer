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
//     const user = await this.influencerService.findOneByEmail(username);
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



import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Influencer } from 'src/influencer/entities/influencer.entity';
import { InfluencerService } from 'src/influencer/influencer.service';
import { ConfigService } from '@nestjs/config';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, Transaction } from 'typeorm';




@Injectable()
export class AuthService {
  constructor(
    private readonly influencerService: InfluencerService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectEntityManager() private entityManager: EntityManager,

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


  // async login(influencer: Influencer) {
  //   const payload = this.createTokenPayload(influencer);
  //   const accessToken = this.jwtService.sign(payload, {
  //     expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRATION', '15m'),
  //   });
  //   const refreshToken = await this.generateAndSaveRefreshToken(influencer); // Updated to generate and save refresh token
  
  //   return { accessToken, refreshToken };
  // }

  

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
  


  // async refreshToken(oldRefreshToken: string) {
  //   // Validate the provided refresh token and get the associated influencer
  //   const influencer = await this.validateRefreshToken(oldRefreshToken);
  
  //   // Assuming validation was successful and didn't throw, generate new tokens
  //   const newAccessToken = this.jwtService.sign(this.createTokenPayload(influencer), {
  //     expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRATION', '15m'),
  //   });
  
  //   // Generate a new refresh token and save it in the database
  //   const newRefreshToken = await this.generateAndSaveRefreshToken(influencer);
  //   return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  // }
  

  

  private createTokenPayload(influencer: Influencer) {
    return {
      email: influencer.email,
      firstName: influencer.firstName,
      id: influencer.id,
      // Include additional necessary data (like roles, permissions) if needed
    };
  }


  

//win
  // async generateAndSaveRefreshToken(influencer: Influencer) {

  //   const existingUser = this.refreshTokenRepository.findOne({where: { influencer: { id: influencer.id }}});

    
    
  //   // Clean up any existing refresh tokens for the influencer
  //     console.log("printed");
  //   const deleteResult = await this.refreshTokenRepository.delete({ influencer: { id: influencer.id } });

  //   console.log(`Deleted ${deleteResult.affected} tokens`);

  //   // await this.refreshTokenRepository.delete({ influencer: influencer });
  
  //   const refreshTokenPayload = { id: influencer.id };
  //   const expiresIn = this.configService.get<string>('REFRESH_TOKEN_EXPIRATION', '7d');
  
  //   // Generate the refresh token
  //   const refreshToken = this.jwtService.sign(refreshTokenPayload, {
  //     secret: this.configService.get('REFRESH_JWT_SECRET'),
  //     expiresIn,
  //   });
  
  //   // Use ms to calculate the expiresAt time based on expiresIn
  //   const expiresAt = new Date(Date.now() + ms(expiresIn));
  
  //   // Create and save the refresh token entity
  //   const refreshTokenEntity = new RefreshToken();
  //   refreshTokenEntity.token = refreshToken;
  //   refreshTokenEntity.influencer = influencer;
  //   refreshTokenEntity.expiresAt = expiresAt;
    
  //   await this.refreshTokenRepository.save(refreshTokenEntity);
  
  //   return refreshToken;
  // }

  
  // async XXXgenerateAndSaveRefreshToken(influencer: Influencer): Promise<string> {
  //   return this.entityManager.transaction(async (transactionalEntityManager) => {
  //     // Find any existing token for the influencer
  //     const existingToken = await transactionalEntityManager.findOne(RefreshToken, {
  //       where: { influencer: { id: influencer.id } }
  //     });
  
  //     // If an existing token is found and it is still valid, return it instead of creating a new one
  //     if (existingToken && new Date() < existingToken.expiresAt) {
  //       return existingToken.token;
  //     }
  
  //     // If no valid existing token, delete any invalid one and proceed to create a new token
  //     if (existingToken) {
  //       await transactionalEntityManager.delete(RefreshToken, { influencer: { id: influencer.id } });
  //     }
  
  //     const refreshTokenPayload = { id: influencer.id };
  //     const expiresIn = this.configService.get<string>('REFRESH_TOKEN_EXPIRATION', '7d');
  //     const refreshToken = this.jwtService.sign(refreshTokenPayload, {
  //       secret: this.configService.get('REFRESH_JWT_SECRET'),
  //       expiresIn,
  //     });
  
  //     const expiresAt = new Date(Date.now() + ms(expiresIn));
  //     const refreshTokenEntity = transactionalEntityManager.create(RefreshToken, {
  //       token: refreshToken,
  //       influencer: influencer,
  //       expiresAt: expiresAt,
  //     });
  
  //     await transactionalEntityManager.save(refreshTokenEntity);
  //     console.log(refreshToken + "refresh token");
  //     return refreshToken; // Return the newly created refreshToken
  //   });
  // }
  

  // async validateRefreshToken(token: string): Promise<Influencer> {
  //   const refreshToken = await this.refreshTokenRepository.findOne({
  //     where: { token },
  //     relations: ['influencer'],
  //   });

  //   console.log(`Token Expires At: ${refreshToken.expiresAt}, Current Time: ${new Date()}`);

  
  //   if (!refreshToken) {
  //     throw new UnauthorizedException('Refresh token does not exist.');
  //   }
  
  //   if (new Date() > refreshToken.expiresAt) {
  //     throw new UnauthorizedException('Refresh token is expired.');
  //   }
  
  //   return refreshToken.influencer;
  // }


//   async logout(influencerId: string) {
//   // Assuming each influencer has a single valid refresh token at any time
//   // This will delete the refresh token from the database, effectively logging the user out
//   const result = await this.refreshTokenRepository.delete({ influencer: { id: influencerId } });
//   if (result.affected === 0) {
//     throw new UnauthorizedException('Logout failed, token not found.');
//   }
//   return { message: 'You have been logged out.' };
// }



  
}
