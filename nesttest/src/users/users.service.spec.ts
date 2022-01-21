import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Status, Licence, Units } from 'src/enum_types';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { MyUserDto } from './dto/my-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const user01: User = {
  id: 1,
  nickname: 'user1',
  email: 'email1@example.com',
  email_verified: true,
  oauth: 'testoauth',
  firstname: 'Test',
  lastname: 'User',
  about: 'about me',
  homepage: 'http://example.com',
  avatar: 'http://avatar.com/avatar1',
  units: Units.METRIC,
  status_max: Status.CONTROVERSIAL,
  licence_default: Licence.PUBLIC_DOMAIN,
  mobile_number: 1234567890,
  cryptpw: 'verysecret',
  uuid: 'uuid01',
  logs: [],
  photos: [],
};

const user01Dto: CreateUserDto = {
  id: 1,
  nickname: 'user1',
  email: 'email1@example.com',
  email_verified: true,
  oauth: 'testoauth',
  firstname: 'Test',
  lastname: 'User',
  about: 'about me',
  homepage: 'http://example.com',
  avatar: 'http://avatar.com/avatar1',
  units: Units.METRIC,
  status_max: Status.CONTROVERSIAL,
  licence_default: Licence.PUBLIC_DOMAIN,
  mobile_number: 1234567890,
  cryptpw: 'verysecret',
};

const myUser01Dto: MyUserDto = {
  id: 1,
  nickname: 'user1',
  email: 'email1@example.com',
  email_verified: true,
  firstname: 'Test',
  lastname: 'User',
  about: 'about me',
  homepage: 'http://example.com',
  avatar: 'http://avatar.com/avatar1',
  units: Units.METRIC,
  status_max: Status.CONTROVERSIAL,
  licence_default: Licence.PUBLIC_DOMAIN,
  mobile_number: 1234567890,
};

const auth0ResultsUser01: Object = {
  sub: 'mockauth0',
  picture: 'http://avatar.com/avatar1',
  email: 'email1@example.com',
  email_verified: true,
  given_name: 'Test',
  family_name: 'User',
};

const userArray = [{ user01 }, { user01 }];

const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOne: jest.fn().mockResolvedValue(user01),
            save: jest.fn().mockResolvedValue(user01),
            remove: jest.fn(),
            softDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    consoleSpy.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create, update and delete', () => {
    it('given a dto to create', async () => {
      const repoSpy = jest.spyOn(repository, 'save');
      const r1 = service.create(user01Dto);
      expect(r1).resolves.toEqual(user01);
      expect(repoSpy).toHaveBeenCalledWith(user01Dto);
    });
    it('given a dto to update', () => {
      const repoSpy = jest.spyOn(repository, 'save');
      const r1 = service.updateMyUser(user01Dto);
      expect(r1).resolves.toEqual(user01);
      expect(repoSpy).toHaveBeenCalledWith(user01Dto);
    });
    it('given a user to delete', async () => {
      const repoSpy = jest.spyOn(repository, 'softDelete');
      const r1 = service.remove(user01.id);
      expect(r1).resolves.toBeUndefined();
      expect(repoSpy).toHaveBeenCalledWith(user01.id);
    });
  });

  describe('find', () => {
    it('should find all users', async () => {
      const repoSpy = jest.spyOn(repository, 'find');
      const r1 = service.findAll();
      expect(r1).resolves.toEqual(userArray);
      expect(repoSpy).toHaveBeenCalled();
    });

    it('should find one user', async () => {
      const repoSpy = jest.spyOn(repository, 'findOne');
      const r1 = service.findOne(user01.id);
      expect(r1).resolves.toEqual(user01);
      expect(repoSpy).toHaveBeenCalledWith(user01.id);
    });
  });

  describe('myUser', () => {
    it('should throw an exception if no user provided', async () => {
      const repoSpy = jest.spyOn(repository, 'findOne');
      await expect(
        service.getMyUser(null, null, null, null, null),
      ).rejects.toEqual(expect.any(NotFoundException));
      expect(repoSpy).not.toHaveBeenCalled();
    });

    it('should find an existing user by oauthUser', async () => {
      const repoSpy = jest.spyOn(repository, 'findOne');
      const r1 = service.getMyUser('testoauth', null, null, null, null);
      expect(r1).resolves.toEqual(myUser01Dto);
      expect(repoSpy).toHaveBeenCalled();
    });

    it('should find an existing user by email', async () => {
      const repoSpy = jest.spyOn(repository, 'findOne');
      const auth0Spy = jest.spyOn(service, 'getAuth0UserDetails');
      auth0Spy.mockImplementation(
        (): Promise<Object> => Promise.resolve(auth0ResultsUser01),
      );
      const r1 = service.getMyUser(
        'nomatch',
        'email1@example.com',
        null,
        null,
        null,
      );
      await expect(r1).resolves.toEqual(myUser01Dto);
      expect(repoSpy).toHaveBeenCalled();
      expect(auth0Spy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('User found by email');
    });

    it('should find an existing user by cookies', async () => {
      const repoSpy = jest.spyOn(repository, 'findOne');
      const auth0Spy = jest.spyOn(service, 'getAuth0UserDetails');
      auth0Spy.mockImplementation(
        (): Promise<Object> => Promise.resolve(auth0ResultsUser01),
      );
      const r1 = service.getMyUser(
        'nomatch',
        'nomatch',
        'verysecret',
        '1',
        null,
      );
      await expect(r1).resolves.toEqual(myUser01Dto);
      expect(repoSpy).toHaveBeenCalled();
      expect(auth0Spy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('User found by cookies');
    });

    it('should create a new user if nothing matched', async () => {
      const repoSpy = jest.spyOn(repository, 'findOne');
      const auth0Spy = jest.spyOn(service, 'getAuth0UserDetails');
      auth0Spy.mockImplementation(
        (): Promise<Object> => Promise.resolve(auth0ResultsUser01),
      );
      const r1 = service.getMyUser(
        'nomatch',
        'nomatch',
        'nomatch',
        'nomatch',
        null,
      );
      await expect(r1).resolves.toEqual(myUser01Dto);
      expect(repoSpy).toHaveBeenCalled();
      expect(auth0Spy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('New user'),
      );
    });
  });
});
