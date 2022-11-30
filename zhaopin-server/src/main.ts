import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const fs = require('fs');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('ZhaoPin')
    .setDescription('The ZhaoPin Report API description')
    .setVersion('1.0.0')
    .addTag('ZhaoPin')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const bodyParser = require('body-parser');
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(
    bodyParser.urlencoded({
      limit: '100mb',
      extended: true,
      parameterLimit: 1000000,
    }),
  );
  app.enableCors();
  await app.listen(9998);
}
bootstrap();
