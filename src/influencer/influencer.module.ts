import { Module } from '@nestjs/common';
import { InfluencerService } from './influencer.service';
import { InfluencerController } from './influencer.controller';
import { Influencer } from './entities/influencer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { InfluencerCompanyModule } from 'src/influencer-company/influencer-company.module';
import { InfluencerAddressModule } from 'src/influencer-address/influencer-address.module';
import { InfluencerCompany } from 'src/influencer-company/entities/influencer-company.entity';
import { InfluencerAddress } from 'src/influencer-address/entities/influencer-address.entity';
import { RefreshToken } from '../refresh-token/entities/refreshtoken.entity';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';

// @Module({
//   imports: [TypeOrmModule.forFeature([Influencer,InfluencerCompany,InfluencerAddress]),HttpModule,ConfigModule,InfluencerCompanyModule,InfluencerAddressModule],
//   controllers: [InfluencerController],
//   providers: [InfluencerService ],
//   exports: [InfluencerService]
// })
// export class InfluencerModule {}



@Module({
  imports: [TypeOrmModule.forFeature([Influencer,InfluencerCompany,InfluencerAddress]),InfluencerCompanyModule,InfluencerAddressModule],
  controllers: [InfluencerController],
  providers: [InfluencerService ],
  exports: [InfluencerService]
})
export class InfluencerModule {}
