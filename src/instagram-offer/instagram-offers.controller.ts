
import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { BulkUpdateInstagramOffersDto } from './dto/bulk-update-instagram-offers.dto';
import { InstagramOffersService } from './instagram-offers.service';
import { GetInfluencer } from 'src/common/decorators/get-influencer.decorator';
import { AuthGuard } from '@nestjs/passport';


@Controller({
  path: 'instagram/offers',
  version: '1',
})
export class InstagramOfferController {

    constructor(
        private readonly instagramOffersService: InstagramOffersService,
    ) {}


  @Patch('bulk-update')
  @UseGuards(AuthGuard('jwt'))
  async bulkUpdateOffers(
    @GetInfluencer() influencerId:string,
    @Body() bulkUpdateDto: BulkUpdateInstagramOffersDto
  ) {
    return this.instagramOffersService.bulkUpdateOffers(influencerId, bulkUpdateDto);
  }
}
