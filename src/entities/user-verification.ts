import { VerificationType } from 'src/utils';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user_verifications' })
export class UserVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  verification_code: string;

  @Column({ nullable: true })
  verified_at: Date;

  @Column({ nullable: true })
  expired_at: Date;

  @Column({
    type: 'enum',
    enum: VerificationType,
  })
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
