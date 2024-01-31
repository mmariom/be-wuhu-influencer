import { BaseEntityCommonUUID } from 'src/common/entity/base-uuid.entity';
import { Influencer } from 'src/influencer/entities/influencer.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class InfluencerCompany extends BaseEntityCommonUUID{

  @Column({ nullable: false })
  companyName: string;

  @Column({ nullable: false })
  street: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  postalCode: string;

  @Column({ nullable: false })
  country: string;

  @Column({ nullable: false })
  companyRegNumber: string;

  // Define the inverse side of a one-to-one relationship, if you want to reference back to the Influencer
  @OneToOne(() => Influencer, influencer => influencer.company)
  influencer: Influencer;
}