


  import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Influencer } from './entities/influencer.entity';
import { UpdateInfluencerDto } from './dto/update-influencer.dto';
import { RegisterInfluencerDto } from './dto/register-influencer.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { InfluencerAddress } from 'src/influencer-address/entities/influencer-address.entity/influencer-address.entity';
import { InfluencerCompany } from 'src/influencer-company/entities/influencer-company.entity/influencer-company.entity';

@Injectable()
export class InfluencerService {
  constructor(
    @InjectRepository(Influencer) private readonly influencerRepo: Repository<Influencer>, 
    @InjectRepository(InfluencerCompany) private readonly influencerCompanyRepo: Repository<InfluencerCompany>,
    private httpService: HttpService, private configService: ConfigService
  ) {}
  async findOneById(id: string) {
    return await this.influencerRepo.findOne({ where: {id : id} });
  }

  async findOneByEmail(userName: string) {
    return await this.influencerRepo.findOne({ where: { email: userName } });
  }

  async findOneWithPhoneNumber(phone: string) {
    return await this.influencerRepo.findOne({ where: { phoneNumber: phone } });
  }



  // async create(createInfluencerDto: CreateInfluencerDto) {
  //   //check if user already exists
  //   const userExists = await this.findOneWithUserName(createInfluencerDto.email);
  //   if (userExists) {
  //     //throw exception if user already exists
  //     throw new ConflictException('User with this email already exists');
  //   }
  //   const user = await this.influencerRepo.create(createInfluencerDto);
  //   await this.influencerRepo.save(user);
  //   const { password, ...result } = user;
  //   return result;
  // }

  // ... within your service file ...

// ... within your service file ...

// async registerInfluencer(registerInfluencerDto: RegisterInfluencerDto): Promise<Influencer> {
//   const influencer = this.influencerRepo.create(registerInfluencerDto);
//   // ... set influencer fields ...

//   if (registerInfluencerDto.isBusinessUser && registerInfluencerDto.company) {
//     const company = this.influencerCompanyRepo.create(registerInfluencerDto.company);
//     await this.influencerCompanyRepo.save(company);
//     influencer.company = company;
//   }

//   await this.influencerRepo.save(influencer);
//   return influencer;
// }


async registerInfluencer(registerInfluencerDto: RegisterInfluencerDto): Promise<Influencer> {
  // Check if a user with the same email or phone number already exists
  const existingUserByEmail = await this.findOneByEmail(registerInfluencerDto.email);
  if (existingUserByEmail) {
    throw new ConflictException('A user with the given email already exists');
  }

  // Check if a user with the same phone number already exists
  const existingUserByPhone = await this.influencerRepo.findOne({
    where: { phoneNumber: registerInfluencerDto.phoneNumber }
  });
  if (existingUserByPhone) {
    throw new ConflictException('A user with the given phone number already exists');
  }

  // If the user is a business user, check if a company with the same registration number already exists
  // if (registerInfluencerDto.isBusinessUser && registerInfluencerDto.company) {
  //   const existingCompany = await this.influencerCompanyRepo.findOne({
  //     where: { companyRegNumber: registerInfluencerDto.company.companyRegNumber },
  //   });

  //   if (existingCompany) {
  //     throw new ConflictException('A company with the given registration number already exists');
  //   }
  // }

  // Create and save the new influencer and company (if applicable)
  const influencer = this.influencerRepo.create(registerInfluencerDto);

  if (registerInfluencerDto.isBusinessUser && registerInfluencerDto.company) {
    const company = this.influencerCompanyRepo.create(registerInfluencerDto.company);
    await this.influencerCompanyRepo.save(company);
    influencer.company = company;
  }

  await this.influencerRepo.save(influencer);
  return influencer;
}


async update(id: number, updateInfluencerDto: UpdateInfluencerDto) {
    return await this.influencerRepo.update(id, updateInfluencerDto);
}

  //Instagram token exchange
  async exchangeCodeForToken(code: string): Promise<any> {
    const tokenExchangeUrl = 'https://api.instagram.com/oauth/access_token';
    const payload = new URLSearchParams({
      client_id: "700239725631538",
      client_secret: "ad8a79525293aac0aeafbe8bfc7609a8",
      grant_type: 'authorization_code',
      redirect_uri: "https://2334-217-119-126-7.ngrok-free.app/callback",
      code,
    });

    try {
      const response = await this.httpService.post(tokenExchangeUrl, payload).toPromise();
      return response.data;
    } catch (error) {
      // Handle errors appropriately
      throw new Error('Error exchanging code for token');
    }
  }

  async fetchUserProfile(access_token: string): Promise<any> {
    try {
      const response = await this.httpService.get(`https://graph.instagram.com/me?fields=id,username,account_type&access_token=${access_token}`).toPromise();
      return response.data;
    } catch (error) {
      throw new Error('Error fetching Instagram profile');
    }
  }


  


}