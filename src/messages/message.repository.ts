import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const contents = await readFile('messages.json', 'utf-8');
    const { data } = JSON.parse(contents);
    return data.find((item) => item.id === Number(id));
  }

  async findAll() {
    const contents = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(contents);

    return messages;
  }

  async createNew(content: string) {
    const contents = await readFile('messages.json', 'utf-8');
    const { data } = JSON.parse(contents);
    const nextId = data[data.length - 1].id + 1;
    const body = {
      id: nextId,
      content,
    };

    await writeFile('messages.json', JSON.stringify({ data: [...data, body] }));
  }
}
