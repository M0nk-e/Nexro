import { Injectable, OnModuleInit } from '@nestjs/common';
import { On } from 'necord';

@Injectable()
export class ReadyEvent implements OnModuleInit {
  @On('ready')
  onReady() {
    console.log('Bot is ready!');
  }

  onModuleInit() {
    console.log('ReadyEvent initialized');
  }
}
