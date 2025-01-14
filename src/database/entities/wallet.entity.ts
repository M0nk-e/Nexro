import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  balance: number;

  @ManyToOne(() => User, (user) => user.discordId)
  user: User;

  @Column()
  createdAt: Date;
}
