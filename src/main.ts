import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { SeederService } from './common/seed/SeederService';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    
  );
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableVersioning({
    type: VersioningType.URI, // or VersioningType.HEADER, VersioningType.MEDIA_TYPE
  });

  app.useGlobalPipes(new ValidationPipe());


      // Get the seeder service and run seeders

      const seederService = app.get(SeederService);
      await seederService.seedInstagramInterests();
      // await seederService.seedInstagramOfferOptions();

  await app.listen(3000);
}
bootstrap();
