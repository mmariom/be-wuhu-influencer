import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Influencer } from 'src/influencer/entities/influencer.entity';
import { BaseEntityCommonUUID } from 'src/common/entity/base-uuid.entity';
import { InstagramAccountMetrics } from 'src/instagram-account-metrics/entities/instagram-account-metrics.entity';
import { InstagramAccountInterests } from 'src/instagram-account-interests/entities/instagram-account-interests.entity';
import { InstagramOffer } from 'src/instagram-offer/entities/instagram-offer.entity';
import { InstagramProfile } from 'src/instagram-profile/entities/instagram-profile.entity';
import { IsInt, Max, Min } from 'class-validator';

export enum AccountStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  PENDING = 'Pending',
  BLOCKED = 'Blocked',
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

// export enum PairedStatus {
//     NotPaired = 'Not Paired',
//     Paired = 'Paired',
// }


@Entity()
export class InstagramAccount extends BaseEntityCommonUUID{


//   @Column({  nullable: false, length: 255 })
//   igProfileName: string;

//   @Column({  nullable: false, length: 255 })
//   igProfileId: string;

//   @Column({ nullable: true })
//   igPicturePath: string; 




  @Column({ nullable:true})
  yearOfBirth: number;


  @Column({ nullable: true, default: false })
  updateMetricsRequested: boolean; 


  // @ManyToOne(() => Influencer, influencer => influencer.instagramAccounts)
  // influencer: Influencer;

  @OneToOne(() => Influencer, influencer => influencer.instagramAccount)
  @JoinColumn()
  influencer: Influencer;


  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.INACTIVE,
    nullable: true})
  status: AccountStatus;

  @Column({ nullable: true})
  country: string;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable:true
  })
  gender: Gender;


//   @Column({
//     type: 'enum',
//     enum: PairedStatus,
//     default: PairedStatus.NotPaired})
//   igAccountPaired: PairedStatus;

  @Column({ nullable: true, default: false })
  acceptingPhysicalGoods: boolean;



  @OneToOne(() => InstagramProfile, profile => profile.instagramAccount, { cascade: true, eager: true })
  @JoinColumn()
  profile: InstagramProfile;


  @OneToOne(() => InstagramAccountMetrics, { cascade: true, eager: true })
  @JoinColumn()
  metrics: InstagramAccountMetrics;

  @ManyToMany(() => InstagramAccountInterests)
  @JoinTable({
    name: 'ig_accounts_and_interests', // Custom name for the join table
    joinColumn: {
      name: 'instagramAccountId', // Name of the column that references InstagramAccount
      referencedColumnName: 'id' // The column in InstagramAccount that this column refers to
    },
    inverseJoinColumn: {
      name: 'interestId', // Name of the column that references InstagramAccountInterests
      referencedColumnName: 'id' // The column in InstagramAccountInterests that this column refers to
    }
  })  
  interests: InstagramAccountInterests[];

  

  @OneToMany(() => InstagramOffer, instagramOffer => instagramOffer.instagramAccount)
  offers: InstagramOffer[];
}
