import { Body, ConflictException, Controller, Get, HttpCode, HttpException, HttpStatus, InternalServerErrorException, Post, Req, Request, Res, UnauthorizedException, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { InfluencerService } from 'src/influencer/influencer.service';
import { RegisterInfluencerDto } from 'src/influencer/dto/register-influencer.dto';
import { Influencer } from 'src/influencer/entities/influencer.entity';
import { JwtGuard } from './guards/jwt-auth.guard';


import { Response } from 'express'; // Import Response



@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private authService: AuthService,
    private influencerService: InfluencerService,
  ) {}

 
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginx(@Request() req) {
    return await this.authService.login(req.user);
  }

//  @UseGuards(LocalAuthGuard)
// @Post('login')
// async login(@Request() req, @Res({ passthrough: true }) response: Response) {
//   const { accessToken, refreshToken } = await this.authService.login(req.user);
  
//   // Set refresh token as HttpOnly cookie
//   response.cookie('RefreshToken', refreshToken, {
//     httpOnly: false,
//     path: '/',
//     // secure: true, // Enable this in production when using HTTPS
//     maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration set according to refresh token's life
//   });

//   // Return only the access token in response body
//   return { accessToken };
// }

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




  // @Post('refresh')
  // @UseGuards(RefreshJwtGuard) 
  // async refrshToken(@Request() req) {

  //   console.log(req.cookies.refreshToken);
  //   return  this.authService.refreshToken(req.cookies.refreshToken);
  
  // }

//   @Post('refresh')
// @UseGuards(RefreshJwtGuard) 
// async refreshToken(@Request() req) {
//   // Assuming the RefreshJwtGuard or some other middleware has attached the user entity to the request
//   const influencer = req.user;
//   // console.log(influencer, "influencer");

//   if (!influencer) {
//     throw new UnauthorizedException('Invalid token');
//   }
// console.log(influencer, "influencer");
//   // Now you're correctly passing an Influencer entity
//   return this.authService.refreshToken(influencer);
// }

@Post('refresh')
@UseGuards(RefreshJwtGuard) 
async refreshToken(@Request() req) {
    const influencer = req.user; // Assuming your guard or some middleware sets the user in the request
    const tokens = await this.authService.refreshToken(influencer);
  
    // You might want to log or use influencerId for something here
    console.log(influencer.id, "influencerId");

    // Send back only the tokens, not the entire user object
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    };
}




// @Post('refresh')
// @UseGuards(RefreshJwtGuard) // Assuming this guard checks the structure but not the expiry
// async refreshToken(@Req() req, @Res({ passthrough: true }) res: Response) {
//   console.log("Refresh token endpoint hit");
//   try {
//     const { accessToken, refreshToken } = await this.authService.refreshToken(req.user);
//     console.log("New tokens generated", { accessToken, refreshToken });

//     // Set new refresh token as HttpOnly cookie
//     res.cookie('RefreshToken', refreshToken, {
//       httpOnly: true,
//       secure: false,
//       sameSite: 'strict',
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return { accessToken };
//   } catch (error) {
//     console.error("Error refreshing token", error);
//     throw new UnauthorizedException('Failed to refresh token');
//   }
// }

  // @Post('refresh')
  // @UseGuards(RefreshJwtGuard) // Assuming this guard validates the structure but not the expiry
  // async refreshToken(@Req() req) {
  //   console.log("bac refresh endpoint");

  //   const authHeader = req.headers['authorization'];
  //   const bearerToken = authHeader && authHeader.split(' ')[1];
  //   if (!bearerToken) {
  //     throw new UnauthorizedException('Bearer token not provided.');
  //   }
  //   return this.authService.refreshToken(bearerToken);
  // }
  



  // @UseGuards(JwtGuard)
  // @Post('logout')
  // async logout(@Request() req) {
  //   // Extract user or token information from req.user
  //   await this.authService.logout(req.user.id);

  //   // Additional steps to clear tokens or manage session state
  //   return { message: 'Logged out successfully' };
  // }



}


