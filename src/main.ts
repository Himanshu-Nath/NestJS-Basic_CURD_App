import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { GlobalValidationPipe } from './common/pipes/validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(GlobalValidationPipe);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('json spaces', 2);
  
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 3030  // process.env.PORT ?? 3030;
  await app.listen(PORT);
  console.log(`Server is running on http://localhost:${PORT}`);
}
bootstrap();
