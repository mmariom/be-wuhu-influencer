import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfluencerCompany } from './entities/influencer-company.entity/influencer-company.entity';

@Module({
 imports: [TypeOrmModule.forFeature([InfluencerCompany])],
 exports: [TypeOrmModule]

})
export class InfluencerCompanyModule {}
