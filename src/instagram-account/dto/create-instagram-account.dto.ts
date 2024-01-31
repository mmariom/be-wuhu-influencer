import { AccountStatus, Gender } from "../entities/instagram-account.entity";

export class CreateInstagramAccountDto {
    yearOfBirth: number;
    updateMetricsRequested: boolean;
    status: AccountStatus;
    country: string;
    gender: Gender;
    acceptingPhysicalGoods: boolean;
    // Add any other fields that you expect to receive from the client
}