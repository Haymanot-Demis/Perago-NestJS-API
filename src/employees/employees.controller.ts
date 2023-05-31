import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { EmployeesService } from './employees.service';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
import { DeleteResult, InsertResult } from 'typeorm';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  @Get()
  findAllEmployees(): Promise<Employee[]> {
    return this.employeesService.findAllEmployees();
  }

  @Get('/some')
  async find(@Query() query_string: CreateEmployeeDTO): Promise<Employee[]> {
    return this.employeesService.find(query_string);
  }

  @Get(':id')
  async findEmployee(@Param('id') id: string): Promise<Employee> {
    const emp = await this.employeesService.findEmployee(id);
    return emp;
  }

  @Post()
  async addEmployee(@Body() employee: Employee): Promise<Employee> {
    return this.employeesService.addEmployee(employee);
  }

  @Put(':id')
  updateEmployee(
    @Param('id') id: string,
    @Body() employee: CreateEmployeeDTO,
  ): Promise<Employee> {
    console.log(id, employee);

    return this.employeesService.updateEmployee(id, employee);
  }

  @Delete()
  removeAllEmployee(): Promise<DeleteResult> {
    return this.employeesService.removeAllEmployees();
  }

  @Delete(':id')
  removeEmployee(@Param('id') id: string): Promise<Employee> {
    return this.employeesService.removeEmployee(id);
  }
}
