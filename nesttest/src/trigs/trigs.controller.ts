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
  ParseIntPipe,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { TrigsService } from './trigs.service';
import { CreateTrigDto } from './dto/create-trig.dto';
import { UpdateTrigDto } from './dto/update-trig.dto';

@Controller('trigs')
@ApiTags('trigs') // swagger
@ApiBearerAuth('jwt') // swagger
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

  /**
   * Get details for a single trigpoint
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.trigsService.findOne(+id);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTrigDto: UpdateTrigDto,
  ) {
    return this.trigsService.update(+id, updateTrigDto);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.trigsService.remove(+id);
  }
}
