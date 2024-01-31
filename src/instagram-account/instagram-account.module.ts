import { Module } from '@nestjs/common';
import { InfluencerModule } from 'src/influencer/influencer.module';
import { InstagramAccountService } from './instagram-account.service';
import { InstagramAccountController } from './instagram-account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstagramAccount } from './entities/instagram-account.entity';
import { Influencer } from 'src/influencer/entities/influencer.entity';
import { InstagramOffersModule } from 'src/instagram-offer/instagram-offers.module';

@Module({
    imports: [TypeOrmModule.forFeature([InstagramAccount,Influencer]), InfluencerModule,InstagramOffersModule],
    controllers: [InstagramAccountController],
    providers: [InstagramAccountService],
    exports: []
})
export class InstagramAccountModule {}
