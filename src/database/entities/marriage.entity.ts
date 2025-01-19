import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { ArrayMaxSize } from 'class-validator';

@Entity()
export class Marriage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user1Id' })
  user1: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user2Id' })
  user2: User;

  @Column()
  user1Id: string;

  @Column()
  user2Id: string;

  @Column('simple-array', { nullable: true })
  @ArrayMaxSize(10)
  kids: string[];

  @Column('simple-array', { nullable: true })
  @ArrayMaxSize(4)
  lastSpouses: string[];

  @Column({ default: 0 })
  marriageDuration: number;

  @Column({ default: 0 })
  vowStreak: number;

  @Column({ nullable: true })
  lastVow: Date;

  @Column()
  marriedAt: Date;

  @Column({ nullable: true })
  divorceAt: Date;
}
