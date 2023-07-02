import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Employee } from './employees/entities/employee.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<Employee[]> {
    return this.appService.getHello();
  }
}
