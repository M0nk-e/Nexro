import { IUser } from '../user';

export interface IWallet {
  id: number;
  balance: number;
  user: IUser;
  createdAt: Date;
}
