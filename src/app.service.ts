import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employees/entities/employee.entity';
import { Repository } from 'typeorm';
import { EmployeesService } from './employees/employees.service';

@Injectable()
export class AppService {
  constructor(private empservice: EmployeesService) {}
  async getHello(): Promise<Employee[]> {
    return this.empservice.findAllEmployees();
  }
}
