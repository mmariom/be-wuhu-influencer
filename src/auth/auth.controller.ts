import { Body, ConflictException, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { InfluencerService } from 'src/influencer/influencer.service';
import { RegisterInfluencerDto } from 'src/influencer/dto/register-influencer.dto';
import { Influencer } from 'src/influencer/entities/influencer.entity';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private authService: AuthService,
    private influencerService: InfluencerService,
  ) {}

    @Get()
  async demo(){
    return "auth from "
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
    async registerInfleuncer(@Body() registerInfluencerDto: RegisterInfluencerDto) {

      try{
        await this.influencerService.registerInfluencer(registerInfluencerDto);
        const registeredInfluencer = await this.influencerService.findOneByEmail(registerInfluencerDto.email);
        return await this.authService.login(registeredInfluencer); 
      }catch(err){
        if (err instanceof ConflictException) {
          return { statusCode: HttpStatus.CONFLICT, message: err.message };
        }
        }
    }




  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refrshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
