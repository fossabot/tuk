import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
// import { IsNumberString } from 'class-validator';
import { AuthGuard } from '@nestjs/passport';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { TrigsService } from './trigs.service';
import { CreateTrigDto } from './dto/create-trig.dto';
import { UpdateTrigDto } from './dto/update-trig.dto';

// export class FindOneParams {
//   @IsNumberString()
//   id: number;
// }

@Controller(['trigs', 'trig']) // backwards compatibility with python FastAPI experiment - TODO: remove later
@ApiTags('trigs') // swagger
@ApiBearerAuth('jwt') // swagger
@UseInterceptors(ClassSerializerInterceptor) // add exposed fields and remove excluded fields from entities
export class TrigsController {
  constructor(private readonly trigsService: TrigsService) {}

  /**
   * Create a new trig record
   */
  @UseGuards(AuthGuard())
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
  // findOne(@Param() params: FindOneParams) {
  // findOne(@Param('id') id: number) {
  findOne(@Param('id', ParseIntPipe) id: number) {
    // return this.trigsService.findOne(+params.id);
    return this.trigsService.findOne(+id);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrigDto: UpdateTrigDto) {
    return this.trigsService.update(+id, updateTrigDto);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trigsService.remove(+id);
  }
}
