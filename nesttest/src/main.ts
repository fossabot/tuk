import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up swagger (OpenAPI frontend API browser)
  const swaggerConfig = new DocumentBuilder()
    .setTitle('TrigpointingUK API')
    .setDescription('The API for TrigpointingUK, used by the new SPA website')
    .setVersion('1.0')
    .addTag('trigs')
    .addTag('logs')
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
