import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RefreshToken } from "./entities/refreshtoken.entity";

@Module({
    imports: [TypeOrmModule.forFeature([RefreshToken])],
    controllers: [],
    providers: [ ],
    exports: [TypeOrmModule.forFeature([RefreshToken])], 

  })
  export class RefreshTokenModule {}
  