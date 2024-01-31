import { BaseEntityCommonUUID } from "src/common/entity/base-uuid.entity";
import { InstagramAccount } from "src/instagram-account/entities/instagram-account.entity";
import { Column, Entity, ManyToOne } from "typeorm";


export enum OfferType {
  POST = "POST",
  REEL = "REEL",
  STORY = "STORY",
  POST_STORY = "POST + STORY",
  // Add more types here if necessary, up to your maximum expected number
}


@Entity()
export class InstagramOffer extends BaseEntityCommonUUID {

  @Column({ nullable: true })
  price: number;


  @Column({
    type: "enum",
    enum: OfferType,
    nullable: true
  })
  offerType: OfferType;


  @Column({ default: false })
  isActive: boolean;


  @ManyToOne(() => InstagramAccount, instagramAccount => instagramAccount.offers)
  instagramAccount: InstagramAccount;

  // @OneToOne(() => InstagramOfferType, { eager: true })
  // @JoinColumn()
  // offerOption: InstagramOfferType;
}
