// instagram-account.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Repository,EntityManager, In } from 'typeorm';
import { InstagramAccount } from './entities/instagram-account.entity';

import { InfluencerService } from 'src/influencer/influencer.service';
import { InstagramProfile } from 'src/instagram-profile/entities/instagram-profile.entity';
import { InstagramOffer, OfferType } from 'src/instagram-offer/entities/instagram-offer.entity';
import { InstagramAccountMetrics } from "../instagram-account-metrics/entities/instagram-account-metrics.entity";
import { InstagramAccountInterests } from 'src/instagram-account-interests/entities/instagram-account-interests.entity';
import { UpdateInstagramAccountDto } from './dto/update-instagram-account.dto';
import { get } from 'http';
import { InstagramAccountDetailsDto } from './dto/get-instagram-account-details.dto';

@Injectable()
export class InstagramAccountService {
    constructor(
        private readonly influencerService: InfluencerService,
        @InjectEntityManager() private entityManager: EntityManager,
        @InjectRepository(InstagramAccount) private readonly instagramAccountRepository: Repository<InstagramAccount>,
        


    ) {}


    async createInstagramAccount(influencerId: string): Promise<{ message: string }> {
        try {
            await this.entityManager.transaction(async manager => {
                const influencer = await this.influencerService.findOneById(influencerId);
                if (!influencer) {
                    throw new Error('Influencer not found');
                }
    
                // Create InstagramAccount with default or empty values
                const instagramAccount = manager.create(InstagramAccount, { influencer });
                await manager.save(instagramAccount);
    
                // Create InstagramProfile with default or empty values
                const instagramProfile = manager.create(InstagramProfile, { instagramAccount });
                await manager.save(instagramProfile);
    
                const InstagramMetrics = manager.create(InstagramAccountMetrics, { instagramAccount });
                await manager.save(InstagramMetrics);
    
                const defaultOfferTypes = Object.values(OfferType); // Array of all offer types
                const offers = defaultOfferTypes.map(offerType => {
                    return manager.create(InstagramOffer, { instagramAccount, offerType });
                });
                await manager.save(offers);

                influencer.instagramAccount = instagramAccount;
                await manager.save(influencer);

           
            });

      
    
            return { message: 'Instagram entities created successfully.' };
        } catch (error) {
            throw new HttpException('Failed to create Instagram entities.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    // async createInstagramEntities(influencerId: string): Promise<InstagramAccount> {
    //     return await this.entityManager.transaction(async manager => {
    //         const influencer = await this.influencerService.findOneById(influencerId);
    //         if (!influencer) {
    //             throw new Error('Influencer not found');
    //         }

    //         // Create InstagramAccount with default or empty values
    //         const instagramAccount = manager.create(InstagramAccount, {
    //             influencer,
    //         });
    //         await manager.save(instagramAccount);

    //         // Create InstagramProfile with default or empty values
    //         const instagramProfile = manager.create(InstagramProfile, {
    //             instagramAccount,
    //             // ...default values for InstagramProfile
    //         });
    //         await manager.save(instagramProfile);


    //         const InstagramMetrics = manager.create(
    //           InstagramAccountMetrics,
    //           {instagramAccount}
    //         )

    //         await manager.save(InstagramMetrics);

 

    //             const defaultOfferTypes = Object.values(OfferType); // Array of all offer types
    //         const offers = defaultOfferTypes.map(offerType => {
    //         return manager.create(InstagramOffer, {
    //             instagramAccount,
    //             offerType, // Use the column name as defined in your entity
    //             // ...default values for InstagramOffer
    //         });
    //         });

            
            
    //         await manager.save(offers);

    //         return instagramAccount; // Return the created InstagramAccount entity
    //     });
    // }


    async updateInstagramAccount(influencerId: string, updateDto: UpdateInstagramAccountDto): Promise<{ message: string }> {
        try {
            await this.entityManager.transaction(async manager => {
                const influencer = await this.influencerService.findOneById(influencerId);
                if (!influencer) {
                    throw new Error('Influencer not found');
                }

                const instagramAccount = await manager.findOne(InstagramAccount, { where: { influencer } });
                if (!instagramAccount) {
                    throw new Error('Instagram account not found');
                }

                // Update properties except 'interests'
                const { interests, ...updateProps } = updateDto;
                manager.merge(InstagramAccount, instagramAccount, updateProps);
                await manager.save(instagramAccount);
    
                // Handle 'interests' separately
                const uniqueInterestIds = [...new Set(interests)];

                // Clear existing interests
                await manager.createQueryBuilder()
                    .delete()
                    .from('ig_accounts_and_interests')
                    .where('instagramAccountId = :id', { id: instagramAccount.id })
                    .execute();
    
                // Set new interests using findBy method
                const interestEntities = await manager.findBy(InstagramAccountInterests, {
                    id: In(uniqueInterestIds),
                });

                instagramAccount.interests = interestEntities;
                await manager.save(instagramAccount);
            });
    
            return { message: 'Instagram account updated successfully.' };
        } catch (error) {
            throw new HttpException('Failed to update Instagram account.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async getInstagramAccountDetails(influencerId: string): Promise<InstagramAccountDetailsDto> {
        const account = await this.instagramAccountRepository.findOne({
          where: { influencer: {id: influencerId} },
          relations: ['interests']
        });
      
        if (!account) {
          throw new Error('Instagram account not found');
        }
      
        return {
          country: account.country,
          gender: account.gender,
          yearOfBirth: account.yearOfBirth,
          interests: account.interests.map(interest => interest.id)
        };
      }
      
    


//     async updateInstagramAccount(influencerId: string, updateDto: UpdateInstagramAccountDto): Promise<InstagramAccount> {
//         return await this.entityManager.transaction(async manager => {
//           const influencer = await this.influencerService.findOneById(influencerId);
//           if (!influencer) {
//             throw new Error('Influencer not found');
//           }
    
//           const instagramAccount = await manager.findOne(InstagramAccount, { where: { influencer } });
//           if (!instagramAccount) {
//             throw new Error('Instagram account not found');
//           }
    
//           // Update properties except 'interests'
//           const { interests, ...updateProps } = updateDto;
//             manager.merge(InstagramAccount, instagramAccount, updateProps);
//             await manager.save(instagramAccount);

//             // Handle 'interests' separately
//             const uniqueInterestIds = [...new Set(interests)];

//             // Clear existing interests
//             await manager.createQueryBuilder()
//                 .delete()
//                 .from('ig_accounts_and_interests')
//                 .where('instagram_account_id = :id', { id: instagramAccount.id })
//                 .execute();

//             // Set new interests using findBy method
//             const interestEntities = await manager.findBy(InstagramAccountInterests, {
//                 id: In(uniqueInterestIds),
//             });
//             instagramAccount.interests = interestEntities;
//             await manager.save(instagramAccount);

//             return instagramAccount;
//         });
//     }
}
