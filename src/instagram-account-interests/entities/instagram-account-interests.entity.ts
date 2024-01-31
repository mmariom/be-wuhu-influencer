import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { InstagramAccount } from 'src/instagram-account/entities/instagram-account.entity';
import { BaseEntityCommonUUID } from 'src/common/entity/base-uuid.entity';
import { BaseEntityCommonPG } from 'src/common/entity/base-pg.entity';

@Entity()
export class InstagramAccountInterests extends BaseEntityCommonPG{ 


  @Column({  nullable: false, length: 255 })
  name: string;

  @ManyToMany(() => InstagramAccount, instagramAccount => instagramAccount.interests)
  instagramAccounts: InstagramAccount[];
}
