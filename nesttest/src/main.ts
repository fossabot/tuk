import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Set up swagger (OpenAPI frontend API browser)
  const swaggerConfig = new DocumentBuilder()
    .setTitle('TrigpointingUK API')
    .setDescription('The API for TrigpointingUK, used by the new SPA website')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'jwt')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  const swaggerOptions = {
    customSiteTitle: "TUK CLI",
  } 
  SwaggerModule.setup('api', app, swaggerDocument, swaggerOptions);

  // Start the app
  await app.listen(3000);
}
bootstrap();
