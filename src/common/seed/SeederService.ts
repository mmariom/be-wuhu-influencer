import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstagramAccountInterests } from 'src/instagram-account-interests/entities/instagram-account-interests.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(InstagramAccountInterests)
        private readonly interestsRepository: Repository<InstagramAccountInterests>,

    ) {}

    async seedInstagramInterests() {
        const interests = ['Cars', 'Motorcycles', 'Beauty', 'Gaming'];
        interests.forEach(async (interestName) => {
            const interest = this.interestsRepository.create({ name: interestName });
            await this.interestsRepository.save(interest);
        });
    }

    // async seedInstagramOfferOptions() {
    //     const offerOptions = ['Post', 'Reel', 'Story', 'Post + Story'];
    //     offerOptions.forEach(async (optionName) => {
    //         const offerOption = this.offerOptionRepository.create({ type: optionName });
    //         await this.offerOptionRepository.save(offerOption);
    //     });
    // }
}
