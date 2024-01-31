import { BaseEntityCommonUUID } from "src/common/entity/base-uuid.entity";
import { InstagramAccount } from "src/instagram-account/entities/instagram-account.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";





@Entity()
export class InstagramProfile extends BaseEntityCommonUUID{


    @Column({ nullable: true })
    igUsername: string;

    @Column({ nullable: true })
    igAccountType: string;

    @Column({ nullable: true })
    igProfileId: string;

    @Column({ nullable: false,default: false })
    igAccountPaired: boolean;



    @OneToOne(() => InstagramAccount, account => account.profile)
    instagramAccount: InstagramAccount;

}
