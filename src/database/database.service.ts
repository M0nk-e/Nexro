import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(@InjectDataSource() private readonly connection: DataSource) {}

  async isConnected(): Promise<boolean> {
    try {
      await this.connection.query('SELECT 1');
      console.log('Database connection is successful');
      return true;
    } catch (error) {
      console.log('Database connection failed');
      return false;
    }
  }
}
