import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  checkHeath() {
    let PORT = process.env.PORT ?? 3030;
    return {status: true, message: `Server is running on port: ${PORT}`}
  }
  
}
