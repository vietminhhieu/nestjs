import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  @Get()
  getMessageList() {
    return this.messagesService.getAllMessage();
  }

  @Post()
  createNewMessage(@Body() body: CreateMessageDto) {
    this.messagesService.createNewMessage(body.content);
  }

  @Get(':id')
  async getMessageDetail(@Param('id') id: string) {
    const message = await this.messagesService.getMessageDetail(id);
    console.log('message', message);
    if (!message) {
      throw new NotFoundException('message not found');
    }
    return message;
  }
}
