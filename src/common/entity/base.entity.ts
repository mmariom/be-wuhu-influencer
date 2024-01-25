
import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity
  } from 'typeorm';
  
  export abstract class BaseEntityCommon extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn({ type: 'timestamp', precision: 0 })
    createdAt: Date;
  
    @CreateDateColumn({ type: 'timestamp', precision: 0 })
    updatedAt: Date;
  }
  