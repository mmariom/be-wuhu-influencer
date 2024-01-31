// bulk-update-instagram-offers.dto.ts

import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { UpdateInstagramOfferDto } from './update-instagram-offer.dto';

export class BulkUpdateInstagramOffersDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateInstagramOfferDto)
  offers: UpdateInstagramOfferDto[];
}
