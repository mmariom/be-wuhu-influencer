
import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity
  } from 'typeorm';
  
  export abstract class BaseEntityCommonUUID extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn({ type: 'timestamp', precision: 0 })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', precision: 0 })
    updatedAt: Date;
  }
  