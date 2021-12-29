import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Point } from 'geojson';
import * as proj4 from 'proj4';
import * as path from 'path';
import * as fs from 'fs';

import { Trig } from './entities/trig.entity';
import { CreateTrigDto } from './dto/create-trig.dto';
import { UpdateTrigDto } from './dto/update-trig.dto';

@Injectable()
export class TrigsService {
  constructor(
    @InjectRepository(Trig)
    private readonly trigsRepository: Repository<Trig>,
  ) {}

  create(createTrigDto: CreateTrigDto): Promise<Trig> {
    const trig = new Trig();
    Object.keys(createTrigDto).forEach((key) => {
      trig[key] = createTrigDto[key];
    });

    // Fill empty osgb values
    if (
      (trig.osgb_eastings == null || trig.osgb_northings == null) &&
      trig.wgs_lat != null &&
      trig.wgs_lon != null
    ) {
      const buffer = fs.readFileSync(
        path.join(__dirname, './OSTN15_NTv2_OSGBtoETRS.gsb'),
      ).buffer;
      proj4.nadgrid('OSTN15_NTv2_OSGBtoETRS', buffer);
      proj4.defs(
        'EPSG:27700',
        '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +units=m +no_defs +nadgrids=OSTN15_NTv2_OSGBtoETRS',
      );
      proj4.defs(
        'ETRS',
        '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +units=m +no_defs +nadgrids=OSTN15_NTv2_OSGBtoETRS',
      );
      proj4.defs(
        'OSGB',
        '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs',
      );
      proj4.defs('WGS', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');
      [trig.osgb_eastings, trig.osgb_northings] = proj4('WGS', 'OSGB', [
        trig.wgs_lon,
        trig.wgs_lat,
      ]);
    }

    // Fill missing wgs values
    if (
      (trig.osgb_eastings != null || trig.osgb_northings != null) &&
      trig.wgs_lat == null &&
      trig.wgs_lon == null
    ) {
      const buffer = fs.readFileSync(
        path.join(__dirname, './OSTN15_NTv2_OSGBtoETRS.gsb'),
      ).buffer;
      proj4.nadgrid('OSTN15_NTv2_OSGBtoETRS', buffer);
      proj4.defs(
        'EPSG:27700',
        '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +units=m +no_defs +nadgrids=OSTN15_NTv2_OSGBtoETRS',
      );
      proj4.defs(
        'ETRS',
        '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +units=m +no_defs +nadgrids=OSTN15_NTv2_OSGBtoETRS',
      );
      proj4.defs(
        'OSGB',
        '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs',
      );
      proj4.defs('WGS', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');
      [trig.wgs_lon, trig.wgs_lat] = proj4('OSGB', 'WGS', [
        trig.osgb_eastings,
        trig.osgb_northings,
      ]);
    }

    // Create Geography for WGS
    if (trig.wgs_lat != null && trig.wgs_lon != null) {
      const wgs_point: Point = {
        type: 'Point',
        coordinates: [trig.wgs_lon, trig.wgs_lat],
      };
      trig.wgs_point = wgs_point;
    }

    // Create Geometry for OSGB
    if (trig.osgb_eastings != null && trig.osgb_northings != null) {
      const osgb_point: Point = {
        type: 'Point',
        coordinates: [trig.osgb_eastings, trig.osgb_northings],
      };
      trig.osgb_point = osgb_point;
    }

    // Soft undelete
    trig.deletedAt = null;

    // console.log(trig);
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
      ...updateTrigDto,
    });
  }

  async remove(id: number) {
    await this.trigsRepository.softDelete(id);
  }
}
