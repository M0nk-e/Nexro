import { Injectable, OnModuleInit } from '@nestjs/common';
import { On } from 'necord';

@Injectable()
export class BotGateway implements OnModuleInit {
  async onModuleInit() {
    console.log('BotGateway initialized');
  }

  @On('shardDisconnect')
  onShardDisconnect() {
    console.log('Bot has disconnected');
  }

  @On('error')
  onError(error: Error) {
    console.error('Bot encountered an error:', error);
  }
}
