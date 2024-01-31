import { BaseEntityCommonUUID } from "src/common/entity/base-uuid.entity";
import { InstagramAccount } from "src/instagram-account/entities/instagram-account.entity";
import { Column, Entity, OneToOne } from "typeorm";

@Entity()
export class InstagramAccountMetrics extends BaseEntityCommonUUID {


  @Column({nullable: true})
  followers: number;

  @Column({nullable: true})
  engagementRate: number;

  // If needed, define the inverse side of the relationship
  @OneToOne(() => InstagramAccount, (instagramAccount) => instagramAccount.metrics)
  instagramAccount: InstagramAccount;
}
