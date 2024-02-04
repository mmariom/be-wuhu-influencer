import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategies/jwt-strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { Influencer } from 'src/influencer/entities/influencer.entity';
import { InfluencerService } from 'src/influencer/influencer.service';
import { InfluencerModule } from 'src/influencer/influencer.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
  
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([Influencer]),
    JwtModule.registerAsync({ // Use registerAsync for dynamic configuration
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), 
      }),
      inject: [ConfigService], // Inject ConfigService
    }), 
    InfluencerModule,RefreshTokenModule
  ],
})
export class AuthModule {}



//   imports: [
//     TypeOrmModule.forFeature([Influencer]),
//     JwtModule.register({
//       secret: "secretKey",
//       signOptions: { expiresIn: '60s' },
      
//     }), InfluencerModule
//   ],
// })
// export class AuthModule {}