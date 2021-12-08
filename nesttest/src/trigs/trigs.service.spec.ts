import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TrigsService } from './trigs.service';
import { Trig } from './entities/trig.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


describe('TrigsService', () => {
  let service: TrigsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: parseInt(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DATABASE,
          synchronize: true,
          autoLoadEntities: true,
          // entities: ['**/*.entity{.ts,.js}'],
          // entities: ['dist/**/*.entity.js'],
          migrationsTableName: 'migration',
          migrations: ['src/migration/*.ts'],
          cli: { migrationsDir: 'src/migration' },
        }),
        TypeOrmModule.forFeature([Trig])
      ], 
      providers: [TrigsService],
    }).compile();

    service = module.get<TrigsService>(TrigsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('dummy', () => {
  //   it('should work', async () => {
  //     expect(1).toBe(1);
  //   })
  // })
});
