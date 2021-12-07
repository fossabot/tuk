import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trig } from './entities/trig.entity';
import { TrigsService } from './trigs.service';
import { TrigsController } from './trigs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Trig])],
  controllers: [TrigsController],
  providers: [TrigsService]
})
export class TrigsModule {}
