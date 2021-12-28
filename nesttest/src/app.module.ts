import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrigsModule } from './trigs/trigs.module';
import { LogsModule } from './logs/logs.module';
import { PhotosModule } from './photos/photos.module';
import { UsersModule } from './users/users.module';
import { AuthzModule } from './authz/authz.module';

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
      autoLoadEntities: true,
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
      cli: { migrationsDir: 'src/migration' },
    }),
    TrigsModule,
    LogsModule,
    PhotosModule,
    UsersModule,
    AuthzModule,
  ],
  controllers: [AppController],
  providers: [
    ConfigService,
    AppService,
  ],
})

export class AppModule {}
