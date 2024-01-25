
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
import { BaseEntityCommon } from 'src/common/entity/base.entity';
import { InfluencerAddress } from 'src/influencer-address/entities/influencer-address.entity/influencer-address.entity';
import { InfluencerCompany } from 'src/influencer-company/entities/influencer-company.entity/influencer-company.entity';
import { IsPhoneNumber } from 'class-validator';


  @Entity()
  export class Influencer extends BaseEntityCommon{

    
  
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


    //TODO: add the DOB field

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


