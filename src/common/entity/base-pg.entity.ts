
import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity
  } from 'typeorm';
  
  export abstract class BaseEntityCommonPG extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn({ type: 'timestamp', precision: 0 })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', precision: 0 })
    updatedAt: Date;
  }
  