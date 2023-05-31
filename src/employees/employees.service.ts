import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { DataSource, DeleteResult, InsertResult, Repository } from 'typeorm';
import { CreateEmployeeDTO } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async find(employee: CreateEmployeeDTO): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: employee,
      relations: ['parent', 'children'],
    });
  }

  async findAllEmployees(): Promise<Employee[]> {
    return this.employeeRepository.find({
      relations: ['parent', 'children'],
    });
  }

  async findEmployee(id: string): Promise<Employee> {
    return this.employeeRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
  }

  async addEmployee(employee: Employee): Promise<Employee> {
    const result = await this.employeeRepository
      .createQueryBuilder()
      .insert()
      .into(Employee)
      .values(employee)
      .execute();

    return this.findEmployee(result.identifiers[0].id);
  }

  async updateEmployee(
    id: string,
    employee: CreateEmployeeDTO,
  ): Promise<Employee> {
    console.log(id, employee);
    const updateRes = await this.employeeRepository
      .createQueryBuilder()
      .update(Employee)
      .set(employee)
      .where('id = :id', { id })
      .execute();

    console.log(updateRes);

    return this.findEmployee(id);
  }

  removeAllEmployees(): Promise<DeleteResult> {
    return this.employeeRepository
      .createQueryBuilder()
      .delete()
      .from(Employee, 'employee')
      .execute();
  }

  removeEmployee(id: string): Promise<Employee> {
    this.employeeRepository
      .createQueryBuilder()
      .delete()
      .from(Employee, 'employee')
      .where('employee.id = :id', { id })
      .execute();

    return this.findEmployee(id);
  }
}
