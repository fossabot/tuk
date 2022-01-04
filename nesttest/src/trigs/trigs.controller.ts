import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '../permissions.decorator';
import { PermissionsGuard } from '../permissions.guard';

import { ApiBearerAuth, ApiOAuth2, ApiTags } from '@nestjs/swagger';

import { TrigsService } from './trigs.service';
import { CreateTrigDto } from './dto/create-trig.dto';
import { UpdateTrigDto } from './dto/update-trig.dto';

@Controller('trigs')
@ApiTags('trigs') // swagger
@ApiBearerAuth('tukjwt') // swagger
@ApiOAuth2([]) // swagger
export class TrigsController {
  constructor(private readonly trigsService: TrigsService) {}

  /**
   * Create a new trig record
   */
  @Post()
  @UseGuards(AuthGuard(), PermissionsGuard) // oauth
  @Permissions('create:trigs') // oauth
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
  // @ApiOAuth2(['create:trigs'])
  @UseGuards(AuthGuard(), PermissionsGuard)
  @Permissions('create:trigs') // TODO: just for testing
  // @Permissions('admin') // TODO: just for testing
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
