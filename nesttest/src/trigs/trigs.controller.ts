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
  @UseGuards(AuthGuard(), PermissionsGuard)
  @Permissions('create:trigs')
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
  @UseGuards(AuthGuard(), PermissionsGuard) // TODO: just for testing
  @Permissions('create:trigs') // TODO: just for testing
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.trigsService.findOne(+id);
  }

  /**
   * Update a trigpoint
   */
  @Patch(':id')
  @UseGuards(AuthGuard(), PermissionsGuard)
  @Permissions('create:trigs')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTrigDto: UpdateTrigDto,
  ) {
    return this.trigsService.update(+id, updateTrigDto);
  }

  /**
   * Soft delete a trigpoint
   */
  @Delete(':id')
  @UseGuards(AuthGuard(), PermissionsGuard)
  @Permissions('create:trigs')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.trigsService.remove(+id);
  }
}
