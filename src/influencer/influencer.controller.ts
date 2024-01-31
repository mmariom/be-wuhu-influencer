



import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { InfluencerService } from './influencer.service';
import { RegisterInfluencerDto } from './dto/register-influencer.dto';
import { PhoneNumberAvailabilityDto } from './dto/phone-number-availability.dto';
import { EmailAvailabilityDto } from './dto/email-availability.dto';
import { GetInfluencer } from 'src/common/decorators/get-influencer.decorator';



@Controller({
  path: 'influencer',
  version: '1',
})
export class InfluencerController {
  constructor(
    private readonly influencerService: InfluencerService,
  ) {}

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.influencerService.findOne(id);
  // }


  @Get('/unprotected')
  unprotected() {
    console.log("unprotected route")
    return  "protected route"
  }



  @UseGuards(JwtGuard)
  @Get('/protected')
  protected(@GetInfluencer('id') influencerId: string ) {
    console.log("protected route")
    console.log(influencerId)
    return  "protected route"
  }

  @Post()
  registerInfluencer(@Body() registerInfluencerDto: RegisterInfluencerDto) {
    //try catch block handle exception 
   
    return this.influencerService.registerInfluencer(registerInfluencerDto);
  }


  @Get('/check-email')
  async checkEmailAvailability(@Query() emailDto: EmailAvailabilityDto): Promise<{ available: boolean }> {
  const userExists = await this.influencerService.findOneByEmail(emailDto.email);
  return { available: !userExists };
  }

  @Get('/check-phone')
  async checkPhoneNumberAvailability(@Query() phoneDto: PhoneNumberAvailabilityDto): Promise<{ available: boolean }> {
    const userExists = await this.influencerService.findOneWithPhoneNumber(phoneDto.phone);
  return { available: !userExists };
  }



  // @UseGuards(JwtGuard)
  // @Get(':id/comments')
  // getUserComment(@Param('id') id: string) {
  //   return this.influencerService.findUserComments(id);
  // }

  // @Post('/exchange-token')
  // async exchangeToken(@Body('code') code: string, @Res() response) {
  //   // console.log("exchange toke n called" + code)
  //   try {
  //     const tokenData = await this.influencerService.exchangeCodeForToken(code);
  //     response.json(tokenData);
  //   } catch (error) {
  //     response.status(500).json({ message: error.message });
  //   }
  // }



  // @Get('/profile')
  // async getProfile(@Query('token') token: string) {
  //   return this.influencerService.fetchUserProfile(token);
  // }


  // @Get('/test')
  // async test() {
  //   // return that text in json format 
  //   return  {name: "jozko", age: 12}
  //     }
}