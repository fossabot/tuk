import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trig } from './entities/trig.entity';
import { TrigsService } from './trigs.service';
import { TrigsController } from './trigs.controller';
import { AuthzModule } from 'src/authz/authz.module';

@Module({
  imports: [TypeOrmModule.forFeature([Trig]), AuthzModule],
  controllers: [TrigsController],
  providers: [TrigsService]
})
export class TrigsModule {}
