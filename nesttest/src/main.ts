import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as crypto from 'crypto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors();

  // Set up swagger (OpenAPI frontend API browser)
  const nonce = crypto.randomBytes(16).toString('base64');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('TrigpointingUK API')
    .setDescription('The API for TrigpointingUK, used by the new SPA website')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt',
    )
    .addOAuth2(
      {
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl:
              'https://teasel.eu.auth0.com/authorize?audience=https://api.trigpointing.dev' +
              `&nonce=${nonce}`,
            tokenUrl: 'https://teasel.eu.auth0.com/oauth/token',
            scopes: { admin: 'Administrators' }, // { profile: 'profile' }
          },
        },
      },
      'oauth2',
    )
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  const swaggerOptions = {
    customSiteTitle: 'TUK CLI',
    explorer: true,
    swaggerOptions: {
      persistAuthorization: false,
      oauth2RedirectUrl: 'http://localhost:3000/api/',
      oauth: {
        clientId: 'MwNqc2NJF2GnX7fZDTxffZIYSgdl6sCP',
      },
    },
  };

  SwaggerModule.setup('docs', app, swaggerDocument, swaggerOptions);

  // Start the app
  await app.listen(3000);
}
bootstrap();
