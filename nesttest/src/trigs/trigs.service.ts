import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trig } from './entities/trig.entity';
import { CreateTrigDto } from './dto/create-trig.dto';
import { UpdateTrigDto } from './dto/update-trig.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Geometry, Point } from 'geojson';
// import { osTransform } from 'osTransform' ;
import * as proj4 from "proj4"; 
import * as path from 'path';

// import { promises as fs } from "fs";
import * as fs from "fs";
import { ConfigModule } from '@nestjs/config';


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

    const buffer = fs.readFileSync(path.join(__dirname, './OSTN15_NTv2_OSGBtoETRS.gsb')).buffer;
    proj4.nadgrid('OSTN15_NTv2_OSGBtoETRS', buffer);
    proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +units=m +no_defs +nadgrids=OSTN15_NTv2_OSGBtoETRS');
    proj4.defs('ETRS', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +units=m +no_defs +nadgrids=OSTN15_NTv2_OSGBtoETRS');
    proj4.defs('OSGB', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs');
    proj4.defs('WGS', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');

    [trig.osgb_eastings, trig.osgb_northings] = proj4('WGS','OSGB', [trig.wgs_lon, trig.wgs_lat])

    // console.log (proj4('WGS','ETRS', [1.3534606328125243, 52.25635981528854]) ) ;
    // console.log (proj4('WGS','OSGB', [1.3534606328125243, 52.25635981528854]) ) ;

    // var p1 = { ea: 337297, no: 503695 };
    // var p2 = { lat: 54.42480998276385, lng: -2.96793742245737 };

    // console.log(p1)

    // console.log(osTransform.toLatLng(p1));
    // console.log(osTransform.toLatLng(p1, 14));

    // console.log(osTransform.fromLatLng(p2));

    // console.log(osTransform.toGridRef(p1));
    // console.log(osTransform.toGridRef(osTransform.fromLatLng(p2)));
    
    // console.log(osTransform.fromGridRef("NY 37297 03695"));


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
