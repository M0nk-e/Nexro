import { IUser } from 'src/interfaces/user/user.int';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User implements IUser {
  @PrimaryColumn({ unique: true })
  discordId: string;

  @Column()
  username: string;

  @Column()
  discriminator: string;

  @Column({ default: 0 })
  level: number;

  @Column({ default: 0 })
  xp: number;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
