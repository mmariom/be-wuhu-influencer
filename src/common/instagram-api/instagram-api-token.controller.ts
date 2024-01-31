



import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    Res,
  } from '@nestjs/common';
import { InstagramApiTokenService } from './instagram-api-token.service';

  
  
  @Controller({path: 'instagram-api',version: '1',})
  export class InstagramApiTokenContorller {
   
    constructor(private readonly instagramApiTokenService: InstagramApiTokenService) {}
  
   
  
    @Post('/exchange-token')
    async exchangeToken(@Body('code') code: string, @Res() response) {
      // console.log("exchange toke n called" + code)
      try {
        const tokenData = await this.instagramApiTokenService.exchangeCodeForToken(code);
        response.json(tokenData);
      } catch (error) {
        response.status(500).json({ message: error.message });
      }
    }
  
  
  
    @Get('/profile')
    async getProfile(@Query('token') token: string) {
      return this.instagramApiTokenService.fetchUserProfile(token);
    }
  
  
  }