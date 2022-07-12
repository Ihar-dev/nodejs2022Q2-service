import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//import { dirname, join } from 'path';
//import { parse } from 'yaml';
//import { readFile } from 'fs/promises';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;

  const config = new DocumentBuilder()
    .setTitle('REST Service')
    .setDescription('Music Home Library')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  /* const rootDirname = dirname(__dirname);
  const DOC_API = await readFile(
    join(rootDirname, './doc', 'api.yaml'),
    'utf-8',
  );
  const document = parse(DOC_API); */

  SwaggerModule.setup('doc', app, document);
  await app.listen(port);
}
bootstrap();
