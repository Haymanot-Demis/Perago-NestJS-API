import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import {
  DataSource,
  DeleteResult,
  InsertResult,
  Repository,
  TreeRepository,
} from 'typeorm';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { updateEmployeeDTO } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: TreeRepository<Employee>,
  ) {}

  async find(employee: CreateEmployeeDTO): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: employee,
      relations: ['parent', 'children'],
    });
  }

  async findAllEmployees(): Promise<any[]> {
    return this.employeeRepository.findTrees({
      relations: ['parent', 'children', 'photos'],
    });
  }

  async findEmployee(id: string): Promise<Employee> {
    return this.employeeRepository.findOne({
      where: { id },
      relations: ['parent', 'children', 'photos'],
    });
  }

  async addEmployee(employee: CreateEmployeeDTO): Promise<Employee> {
    const result = await this.employeeRepository
      .createQueryBuilder()
      .insert()
      .into(Employee)
      .values({ ...employee, parent })
      .execute();

    return this.findEmployee(result.identifiers[0].id);
  }

  async updateEmployee(
    id: string,
    employee: updateEmployeeDTO,
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

  removeEmployee(id: string): Promise<DeleteResult> {
    return this.employeeRepository
      .createQueryBuilder()
      .delete()
      .from(Employee, 'employee')
      .where('employee.id = :id', { id })
      .execute();
  }
}
