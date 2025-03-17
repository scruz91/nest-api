import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('tasas')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getTasas(): Promise<any> {
    return this.appService.getConsultaTasas();
  }
}
