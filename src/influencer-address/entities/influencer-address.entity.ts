import { BaseEntityCommonUUID } from 'src/common/entity/base-uuid.entity';
import { Influencer } from 'src/influencer/entities/influencer.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class InfluencerAddress extends BaseEntityCommonUUID{

  @Column({  nullable: false })
  street: string;

  @Column({  nullable: false })
  city: string;

  @Column({  nullable: false })
  postalCode: string;

  @Column({  nullable: false })
  country: string;

  @OneToOne(() => Influencer, influencer => influencer.address)
  influencer: Influencer;

}