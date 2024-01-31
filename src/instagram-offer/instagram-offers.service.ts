// instagram-offers.service.ts

import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { BulkUpdateInstagramOffersDto } from "./dto/bulk-update-instagram-offers.dto";
import { InstagramOffer } from "./entities/instagram-offer.entity";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class InstagramOffersService {
    constructor(
        @InjectEntityManager() private entityManager: EntityManager,
        @InjectRepository(InstagramOffer) private readonly instagramOfferRepository: Repository<InstagramOffer>,
    ) {}

    // async bulkUpdateOffers(influencerId:string, bulkUpdateDto: BulkUpdateInstagramOffersDto): Promise<InstagramOffer[]> {
    //     return await this.entityManager.transaction(async manager => {
    //         const updatedOffers: InstagramOffer[] = [];



    //         for (const offerUpdate of bulkUpdateDto.offers) {
    //             const offer = await manager.findOne(InstagramOffer, {where: {id: offerUpdate.id}});
    //             if (!offer) {
    //                 // Handle the error here if an offer is not found
    //                 throw new Error(`Offer with ID ${offerUpdate.id} not found`);
    //             }

    //             offer.price = offerUpdate.price ?? offer.price;
    //             offer.isActive = offerUpdate.isActive ?? offer.isActive;

    //             await manager.save(InstagramOffer, offer);
    //             updatedOffers.push(offer);
    //         }

    //         return updatedOffers;
    //     });
    // }


    // async bulkUpdateOffersX(influencerId: string, bulkUpdateDto: BulkUpdateInstagramOffersDto): Promise<InstagramOffer[]> {
    //     return await this.entityManager.transaction(async manager => {
    //         const updatedOffers = [];

    //         for (const offerUpdate of bulkUpdateDto.offers) {
    //             const offer = await manager.findOne(InstagramOffer, {
    //                 where: { id: offerUpdate.id },
    //                 relations: ['instagramAccount', 'instagramAccount.influencer']
    //             });

    //             if (!offer) {
    //                 continue; // Optionally, handle the error here.
    //             }

    //             // Verify that the offer belongs to the influencer making the request
    //             if (offer.instagramAccount.influencer.id !== influencerId) {
    //                 throw new UnauthorizedException('You are not authorized to update this offer.');
    //             }

    //             // Update only the price and isActive properties
    //             offer.price = offerUpdate.price ?? offer.price;
    //             offer.isActive = offerUpdate.isActive ?? offer.isActive;

    //             await manager.save(offer);
    //             updatedOffers.push(offer);
    //         }

    //         return updatedOffers;
    //     });
    // }



  async bulkUpdateOffers(influencerId: string,bulkUpdateDto: BulkUpdateInstagramOffersDto): Promise<{ message: string }> {
    return await this.entityManager.transaction(async (transactionalEntityManager) => {
      for (const offerUpdate of bulkUpdateDto.offers) {
        const offer = await transactionalEntityManager.findOne(InstagramOffer, {
          where: { id: offerUpdate.id },
          relations: ['instagramAccount', 'instagramAccount.influencer'],
        });

        if (!offer) {
          throw new NotFoundException(`Offer with ID ${offerUpdate.id} not found.`);
        }

        if (offer.instagramAccount.influencer.id !== influencerId) {
          throw new UnauthorizedException(`You are not authorized to update the offer with ID ${offerUpdate.id}.`);
        }

        offer.price = offerUpdate.price ?? offer.price;
        offer.isActive = offerUpdate.isActive ?? offer.isActive;

        await transactionalEntityManager.save(offer);
      }

      return { message: 'Offers updated successfully.' };
    }).catch((error) => {
      throw new HttpException(error.message || 'Failed to update offers.', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
}
