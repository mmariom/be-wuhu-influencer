import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstagramAccountInterests } from 'src/instagram-account-interests/entities/instagram-account-interests.entity';
import { SeederService } from './seed/SeederService';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { InstagramApiTokenService } from './instagram-api/instagram-api-token.service';
import { InstagramApiTokenContorller } from './instagram-api/instagram-api-token.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([InstagramAccountInterests]),HttpModule,ConfigModule
      ],

  providers: [SeederService,InstagramApiTokenService],
  controllers: [InstagramApiTokenContorller],
  exports: [SeederService] // Export if you want to use it outside this module
})
export class CommonModule {
  // Your module setup...
}
