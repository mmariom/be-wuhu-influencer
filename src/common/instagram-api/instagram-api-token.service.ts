import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";

@



Injectable()
export class InstagramApiTokenService {
  constructor(
    private httpService: HttpService, private configService: ConfigService
    
  ) {}



  //Instagram token exchange
  async exchangeCodeForToken(code: string): Promise<any> {
    const tokenExchangeUrl = 'https://api.instagram.com/oauth/access_token';
    const payload = new URLSearchParams({
      client_id: "700239725631538",
      client_secret: "ad8a79525293aac0aeafbe8bfc7609a8",
      grant_type: 'authorization_code',
      redirect_uri: "https://b5dd-217-119-126-7.ngrok-free.app/callback",
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
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw new Error('Error fetching Instagram profile');
    }
  }


  
}