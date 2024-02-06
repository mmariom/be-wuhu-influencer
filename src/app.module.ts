import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfluencerModule } from './influencer/influencer.module';
import { AuthModule } from './auth/auth.module';
import { InfluencerAddressModule } from './influencer-address/influencer-address.module';
import { InfluencerCompanyModule } from './influencer-company/influencer-company.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InstagramAccountModule } from './instagram-account/instagram-account.module';
import { InstagramAccountMetricsModule } from './instagram-account-metrics/instagram-account-metrics.module';
import { InstagramAccountInterestsModule } from './instagram-account-interests/instagram-account-interests.module';
import { CommonModule } from './common/common.module';
import { InstagramProfileModule } from './instagram-profile/instagram-profile.module';
import { InstagramOffersModule } from './instagram-offer/instagram-offers.module';

// @Module({
  // imports: [ConfigModule.forRoot({isGlobal: true, envFilePath: '.env',}),TypeOrmModule.forRoot(dataSourceOptions), 
  //   InfluencerModule,AuthModule, InfluencerAddressModule, InfluencerCompanyModule],
//   controllers: [AppController],
//   providers: [ConfigService],
// })
// export class AppModule {}




// @Module({
//   imports: [
//     ConfigModule.forRoot({isGlobal: true, envFilePath: '.env'}),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (config: ConfigService) => getDataSourceOptions(
//         config.get<string>('DB_TYPE'),
//         config.get<string>('HOST'),
//         config.get<number>('PORT'),
//         config.get<string>('USERNAME'),
//         config.get<string>('PASSWORD'),
//         config.get<string>('DATABASE')
//       ),
//     }),
    
//     InfluencerModule,AuthModule, InfluencerAddressModule, InfluencerCompanyModule],
  
//   controllers: [AppController],
//   providers: [ConfigService],
// })
// export class AppModule {}





@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get<string>('DB_TYPE') as any,
        host: config.get<string>('HOST'),
        port: config.get<number>('PORT'),
        username: config.get<string>('USERNAME'),
        password: config.get<string>('PASSWORD'),
        database: config.get<string>('DATABASE'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/db/migrations/*{.ts,.js}'],
        synchronize: false,
      }),
    }),
    InfluencerModule,
    AuthModule,
    InfluencerAddressModule,
    InfluencerCompanyModule,
    InstagramAccountModule,
    InstagramAccountMetricsModule,
    InstagramAccountInterestsModule,
    InstagramOffersModule,
    CommonModule,
    InstagramProfileModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
