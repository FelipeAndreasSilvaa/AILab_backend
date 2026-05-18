import { Injectable } from '@nestjs/common';
import { CreateSpeechtotextDto } from './dto/create-speechtotext.dto';
import { UpdateSpeechtotextDto } from './dto/update-speechtotext.dto';

@Injectable()
export class SpeechtotextService {
  create(createSpeechtotextDto: CreateSpeechtotextDto) {
    return 'This action adds a new speechtotext';
  }

  findAll() {
    return `This action returns all speechtotext`;
  }

  findOne(id: number) {
    return `This action returns a #${id} speechtotext`;
  }

  update(id: number, updateSpeechtotextDto: UpdateSpeechtotextDto) {
    return `This action updates a #${id} speechtotext`;
  }

  remove(id: number) {
    return `This action removes a #${id} speechtotext`;
  }
}
