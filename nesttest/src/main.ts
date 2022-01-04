import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
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
  // add exposed fields and remove excluded fields from entities
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // allow global CORS
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
    // .addOAuth2(
    //   {
    //     type: 'oauth2',
    //     flows: {
    //       implicit: {
    //         authorizationUrl:
    //           'https://teasel.eu.auth0.com/authorize?audience=https://api.trigpointing.dev' +
    //           `&nonce=${nonce}`,
    //         tokenUrl: 'https://teasel.eu.auth0.com/oauth/token',
    //         scopes: { admin: 'Administrators' }, // { profile: 'profile' }
    //       },
    //     },
    //   },
    //   'oauth2',
    // )
    .addOAuth2(
      {
        type: 'oauth2',
        flows: {
          authorizationCode: {
            authorizationUrl:
              'https://teasel.eu.auth0.com/authorize?audience=https://api.trigpointing.dev' +
              `&nonce=${nonce}`,
            tokenUrl: 'https://teasel.eu.auth0.com/oauth/token',
            scopes: {
              admin: 'Administrators',
              'create:trigs': 'Create Trigpoint records',
            },
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
      persistAuthorization: true,
      oauth2RedirectUrl: 'http://localhost:3000/docs/oauth2-redirect.html',
      oauth: {
        clientId: 'HZvQMRc1HLlLNgF1GnfKc142p6uepKBD',
      },
    },
  };

  SwaggerModule.setup('docs', app, swaggerDocument, swaggerOptions);

  // Start the app
  await app.listen(3000);
}
bootstrap();
