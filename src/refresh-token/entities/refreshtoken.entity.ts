import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
  } from 'typeorm';
  import { Influencer } from '../../influencer/entities/influencer.entity';
  
  @Entity()
  export class RefreshToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', nullable: false })
    token: string;
  
    @Column({ type: 'timestamptz', nullable: false })
    expiresAt: Date;
  
    // @ManyToOne(() => Influencer, (influencer) => influencer.refreshTokens, { onDelete: 'CASCADE' })
    // @JoinColumn({ name: 'influencerId' })
    // influencer: Influencer;


    @OneToOne(() => Influencer, influencer => influencer.refreshToken, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'influencerId' })
    influencer: Influencer;
  }
  