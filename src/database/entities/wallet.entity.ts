import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { IWallet } from 'src/interfaces/wallet';

@Entity()
export class Wallet implements IWallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  balance: number;

  @ManyToOne(() => User, (user) => user.discordId)
  user: User;

  @Column()
  createdAt: Date;
}
