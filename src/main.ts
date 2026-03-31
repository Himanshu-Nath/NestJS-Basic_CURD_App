import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('json spaces', 2);
  
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 3030  // process.env.PORT ?? 3030;
  await app.listen(PORT);
  console.log(`Server is running on http://localhost:${PORT}`);
}
bootstrap();
