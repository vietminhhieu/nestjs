import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './message.repository';

@Injectable()
export class MessagesService {
  constructor(public messagesRepo: MessagesRepository) {}

  async getMessageDetail(id: string) {
    return this.messagesRepo.findOne(id);
  }

  async getAllMessage() {
    return this.messagesRepo.findAll();
  }

  async createNewMessage(message: string) {
    return this.messagesRepo.createNew(message);
  }
}
