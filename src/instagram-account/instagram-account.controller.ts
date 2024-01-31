// instagram-account.controller.ts

import { Controller, Post, UseGuards, Req, Body, Patch, Param, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InstagramAccountService } from './instagram-account.service';
import { Request } from 'express';
import { GetInfluencer } from 'src/common/decorators/get-influencer.decorator';
import { CreateInstagramAccountDto } from './dto/create-instagram-account.dto';
import { UpdateInstagramAccountDto } from './dto/update-instagram-account.dto';
import { InstagramAccount } from './entities/instagram-account.entity';
import { InstagramAccountDetailsDto } from './dto/get-instagram-account-details.dto';


@Controller({
    path: 'instagram/account',
    version: '1',
  })
export class InstagramAccountController {
    constructor(private readonly instagramAccountService: InstagramAccountService) {}

    // @Post('create')
    // @UseGuards(AuthGuard('jwt'))
    // async createAccount(@GetInfluencer() influencerId: string,   
    // @Body() createInstagramAccountDto: CreateInstagramAccountDto
    // ){
    //     // const influencerId = req.user.id;
    //     return await this.instagramAccountService.createAccount(influencerId, createInstagramAccountDto);
    // }




    @Get('get-account-details')
    @UseGuards(AuthGuard('jwt'))
    async getAccountDetails(@GetInfluencer() influencerId:string): Promise<InstagramAccountDetailsDto> {
      console.log(influencerId);
      return await this.instagramAccountService.getInstagramAccountDetails(influencerId);
    }

    @Post('create-account')
    @UseGuards(AuthGuard('jwt'))
    async createAccount(@GetInfluencer() influencerId:string) {
        return await this.instagramAccountService.createInstagramAccount(influencerId);
    }



    @Patch('update-account')
    @UseGuards(AuthGuard('jwt'))
    async updateAccountWithInterests(@GetInfluencer() influencerId:string,@Body() updateDto: UpdateInstagramAccountDto) {
      return await this.instagramAccountService.updateInstagramAccount(influencerId, updateDto);
    }
}


