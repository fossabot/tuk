import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { TrigsModule } from 'src/trigs/trigs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Log]), TrigsModule],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
