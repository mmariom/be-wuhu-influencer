
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
import { BaseEntityCommonUUID } from 'src/common/entity/base-uuid.entity';
import { InfluencerCompany } from 'src/influencer-company/entities/influencer-company.entity';
import { IsPhoneNumber } from 'class-validator';
import { InstagramAccount } from 'src/instagram-account/entities/instagram-account.entity';
import { InfluencerAddress } from 'src/influencer-address/entities/influencer-address.entity';


  @Entity()
  export class Influencer extends BaseEntityCommonUUID{

    
  
    @Column({ nullable: false, unique: true })
    email: string;
  
    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false, unique: true })
    @IsPhoneNumber()
    phoneNumber: string;

    @Column({ nullable: false })
    firstName: string;

    @Column({  nullable: false })
    lastName: string;

    @Column({ nullable: false, default: true })
    accountIsActive: boolean;

    @Column({ nullable: false, default: false })
    accountIdVerified: boolean;

    @Column({ nullable: false})
    isBusinessUser: boolean;


    // @OneToMany(() => InstagramAccount, instagramAccount => instagramAccount.influencer)
    // instagramAccounts: InstagramAccount[];

    @OneToOne(() => InstagramAccount, instagramAccount => instagramAccount.influencer, { eager: true, cascade: true })
    @JoinColumn()
    instagramAccount: InstagramAccount;

    @OneToOne(() => InfluencerAddress, { eager: true, cascade: true })
    @JoinColumn()
    address: InfluencerAddress;
  
    // Define the one-to-one relationship to InfluencerCompany
    // This should be nullable since it depends on the isBusinessUser flag
    @OneToOne(() => InfluencerCompany, { eager: true, cascade: true, nullable: true })
    @JoinColumn()
    company?: InfluencerCompany;
    
  
    @BeforeInsert()
    async hashPasword() {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }


