import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const fs = require('fs');

async function bootstrap() {
  // 不能启用https否则会报跨域错误
  //const keyFile  = fs.readFileSync(__dirname + '/template/wangzm.cn.key');
  //const certFile = fs.readFileSync(__dirname + '/template/wangzm.cn.pem');
  // const app = await NestFactory.create(AppModule, {httpsOptions: {
  //   key: keyFile,
  //   cert: certFile,
  // }}); 
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('IMC Report')
    .setDescription('The IMC Report API description')
    .setVersion('0.0.2')
    .addTag('IMC')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const bodyParser = require('body-parser');
  app.use(bodyParser.json({limit:'50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
  app.enableCors();
  await app.listen(9070); // client use 9090
}
bootstrap();
