import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Status, Licence, Units } from 'src/enum_types';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const user01: User = {
  id: 1,
  nickname: '',
  email: '',
  oauth: '',
  firstname: '',
  lastname: '',
  about: '',
  homepage: '',
  units: Units.METRIC,
  status_max: Status.CONTROVERSIAL,
  licence_default: Licence.PUBLIC_DOMAIN,
  mobile_number: 0,
  uuid: '',
  logs: [],
  photos: [],
};

const userArray = [{ user01 }, { user01 }];

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOne: jest.fn().mockResolvedValue(user01),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
