/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { getRandomCard, Card } from './cards/card.droprate';

@Injectable()
export class CardService {
  generateCard(): Card {
    return getRandomCard();
  }
}
