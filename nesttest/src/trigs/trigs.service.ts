import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trig } from './entities/trig.entity';
import { CreateTrigDto } from './dto/create-trig.dto';
import { UpdateTrigDto } from './dto/update-trig.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Geometry, Point } from 'geojson';


@Injectable()
export class TrigsService {
  constructor(
    @InjectRepository(Trig)
    private readonly trigsRepository: Repository<Trig>,
  ) {}

  create(createTrigDto: CreateTrigDto): Promise<Trig> {
    const trig = new Trig();
    trig.id = createTrigDto.id;
    trig.name = createTrigDto.name;
    trig.wgs_lat = createTrigDto.wgs_lat;
    trig.wgs_lon = createTrigDto.wgs_lon;


    const wgs_point :Point= {
      type: "Point",
      coordinates: [trig.wgs_lon,trig.wgs_lat]
    };
    trig.wgs_point = wgs_point;

    console.log(trig);
    return this.trigsRepository.save(trig);
  }

  findAll() {    
    return this.trigsRepository.find();
  }

  findOne(id: number) {
    return this.trigsRepository.findOne(id);
  }

  update(id: number, updateTrigDto: UpdateTrigDto) {
    return this.trigsRepository.save({
      id: id,
      ...updateTrigDto
    })
  }

  async remove(id: number) {
    await this.trigsRepository.delete(id);
  }
}
