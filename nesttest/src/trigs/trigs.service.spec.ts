import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrigDto } from './dto/create-trig.dto';

import { Trig } from './entities/trig.entity';
import { TrigsService } from './trigs.service';

const trig01 = {
  id: 1,
  name: 'trig01',
  wgs_lat: 51,
  wgs_lon: -1,
  osgb_eastings: 470267,
  osgb_northings: 122765,
  wgs_point: { type: 'Point', coordinates: [-1, 51] },
  osgb_point: {
    type: 'Point',
    coordinates: [470267, 122765],
  },
};

const trigArray = [{ trig01 }, { trig01 }];

describe('TrigsService', () => {
  let service: TrigsService;
  let repository: Repository<Trig>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrigsService,
        {
          provide: getRepositoryToken(Trig),
          useValue: {
            find: jest.fn().mockResolvedValue(trigArray),
            findOne: jest.fn().mockResolvedValue(trig01),
            save: jest.fn().mockResolvedValue(trig01),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TrigsService>(TrigsService);
    repository = module.get<Repository<Trig>>(getRepositoryToken(Trig));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('given a dto with missing osgb coords', async () => {
      // arrange
      const test1Dto: CreateTrigDto = {
        id: 1,
        name: 'test01',
        wgs_lat: 51,
        wgs_lon: -1,
        osgb_eastings: null,
        osgb_northings: null,
      };

      //act
      const r1 = await service.create(test1Dto);

      console.log(r1);
      console.log(test1Dto);
      //assert

      expect(service).toBeDefined();

      expect(r1).toEqual(test1Dto);
    });

    it('given a dto with missing wgs coords', () => {
      // arrange
      const trig2Dto: CreateTrigDto = {
        id: 2,
        name: 'test02',
        wgs_lat: null,
        wgs_lon: null,
        osgb_eastings: 470267.34536504897,
        osgb_northings: 122765.53816158895,
      };
      const repoSpy = jest.spyOn(repository, 'save');

      //act
      const r2 = service.create(trig2Dto);

      console.log(r2);
      console.log(trig2Dto);

      //assert
      expect(r2).resolves.toEqual(trig2Dto);
      expect(repoSpy).toBeCalledWith();

      // it('should successfully calculate missing osgb coords', () => {
      //   expect(result).toEqual(trig01);
      // });
    });
  });
});
