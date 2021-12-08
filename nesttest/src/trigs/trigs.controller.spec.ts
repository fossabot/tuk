import { Test, TestingModule } from '@nestjs/testing';
import { TrigsController } from './trigs.controller';
import { TrigsService } from './trigs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Trig } from './entities/trig.entity';

describe('TrigsController', () => {
  let controller: TrigsController;

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
      controllers: [TrigsController],
      providers: [TrigsService],
    }).compile();

    controller = module.get<TrigsController>(TrigsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
