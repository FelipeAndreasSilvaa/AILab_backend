import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpeechtotextService } from './speechtotext.service';
import { CreateSpeechtotextDto } from './dto/create-speechtotext.dto';
import { UpdateSpeechtotextDto } from './dto/update-speechtotext.dto';

@Controller('speechtotext')
export class SpeechtotextController {
  constructor(private readonly speechtotextService: SpeechtotextService) {}

  @Post()
  create(@Body() createSpeechtotextDto: CreateSpeechtotextDto) {
    return this.speechtotextService.create(createSpeechtotextDto);
  }

  @Get()
  findAll() {
    return this.speechtotextService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speechtotextService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpeechtotextDto: UpdateSpeechtotextDto) {
    return this.speechtotextService.update(+id, updateSpeechtotextDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speechtotextService.remove(+id);
  }
}
