import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { TrigsService } from './trigs.service';
// import { Trig } from './entities/trig';

import { CreateTrigDto } from './dto/create-trig.dto';
import { UpdateTrigDto } from './dto/update-trig.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@Controller('trigs')
@ApiTags('trigs')

@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth('jwt')


export class TrigsController {
  constructor(private readonly trigsService: TrigsService) {}

  /**
   * Create a new trig
   */
  @UseGuards(AuthGuard('jwt'))
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

  // @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.trigsService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrigDto: UpdateTrigDto) {
    return this.trigsService.update(+id, updateTrigDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trigsService.remove(+id);
  }
}
