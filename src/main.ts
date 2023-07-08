import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();
  const PORT = configService.get('PORT') || 3000;
  console.log('PORT', configService.get('PORT'));

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Perago Information systems')
    .setDescription('Organizational Heirarchy')
    .setVersion('1.0')
    .addTag('PIS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT, () => {
    console.log('Server is running at port ' + PORT);
  });
}
bootstrap();
///
