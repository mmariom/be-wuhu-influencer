import { Body, ConflictException, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, Post, Req, Request, UnauthorizedException, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { InfluencerService } from 'src/influencer/influencer.service';
import { RegisterInfluencerDto } from 'src/influencer/dto/register-influencer.dto';
import { Influencer } from 'src/influencer/entities/influencer.entity';
import { JwtGuard } from './guards/jwt-auth.guard';

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
  // @HttpCode(HttpStatus.CREATED)
    async registerInfleuncer(@Body() registerInfluencerDto: RegisterInfluencerDto) {

      try {
        await this.influencerService.registerInfluencer(registerInfluencerDto);
        const registeredInfluencer = await this.influencerService.findOneByEmail(registerInfluencerDto.email);
        return await this.authService.login(registeredInfluencer); 
      } catch (err) {
        if (err instanceof ConflictException) {
          throw new ConflictException(err.message);
        }
        // For other types of errors, you might want to throw a generic exception or handle them accordingly
        throw new InternalServerErrorException();
      }
      


    }




  // @UseGuards(RefreshJwtGuard)
  // @Post('refresh')
  // async refrshToken(@Request() req) {
  //   return this.authService.refreshToken(req.user);
  // }
  @Post('refresh')
  @UseGuards(RefreshJwtGuard) // Assuming this guard validates the structure but not the expiry
  async refreshToken(@Req() req) {
    console.log("bac refresh endpoint");

    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader && authHeader.split(' ')[1];
    if (!bearerToken) {
      throw new UnauthorizedException('Bearer token not provided.');
    }
    return this.authService.refreshToken(bearerToken);
  }
  



  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(@Request() req) {
    // Extract user or token information from req.user
    await this.authService.logout(req.user.id);

    // Additional steps to clear tokens or manage session state
    return { message: 'Logged out successfully' };
  }



}


