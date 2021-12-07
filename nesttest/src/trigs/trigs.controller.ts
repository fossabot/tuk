import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrigsService } from './trigs.service';
// import { Trig } from './entities/trig';

import { CreateTrigDto } from './dto/create-trig.dto';
import { UpdateTrigDto } from './dto/update-trig.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('trigs')
@ApiTags('trigs')

export class TrigsController {
  constructor(private readonly trigsService: TrigsService) {}

  /**
   * Create a new trig
   */
  @Post()
  create(@Body() createTrigDto: CreateTrigDto) {
    return this.trigsService.create(createTrigDto);
  }

  /**
   * List all trigpoints
   */

  @Get()
  findAll() {
    return this.trigsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trigsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrigDto: UpdateTrigDto) {
    return this.trigsService.update(+id, updateTrigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trigsService.remove(+id);
  }
}
