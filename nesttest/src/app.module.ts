import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrigsModule } from './trigs/trigs.module';
import { LogsModule } from './logs/logs.module';
import { PhotosModule } from './photos/photos.module';
import { UsersModule } from './users/users.module';

@Module({
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
      autoLoadEntities: true, // autoloads all entities registeres with forFeature()
      // entities: ['**/*.entity{.ts,.js}'],
      // entities: ['dist/**/*.entity.js'],
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
      cli: { migrationsDir: 'src/migration' },
    }),
    TrigsModule,
    LogsModule,
    PhotosModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    ConfigService,
    AppService,
  ],
})

export class AppModule {}
