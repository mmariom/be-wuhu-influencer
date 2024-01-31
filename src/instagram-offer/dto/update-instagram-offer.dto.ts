// update-instagram-offer.dto.ts

import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateInstagramOfferDto {
  @IsUUID()
  @IsNotEmpty()
  id: string; // To identify the offer

  @IsNumber()
  @IsNotEmpty()
  price?: number;

  @IsBoolean()
  @IsNotEmpty()
  isActive?: boolean;
}
