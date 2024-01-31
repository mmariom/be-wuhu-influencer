import { Module } from '@nestjs/common';
import { InstagramOffer } from './entities/instagram-offer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstagramOfferController } from './instagram-offers.controller';
import { InstagramOffersService } from './instagram-offers.service';





@Module({
    imports: [TypeOrmModule.forFeature([InstagramOffer])],
    controllers: [InstagramOfferController],
    providers: [InstagramOffersService],
    exports: []
})
export class InstagramOffersModule {}


