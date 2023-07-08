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
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private configService: ConfigService,
  ) {}

  async find(employee: CreateEmployeeDTO): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: employee,
      relations: ['parent', 'children'],
    });
  }

  async findEmployeeByEmail(email: string): Promise<Employee> {
    return this.employeeRepository
      .createQueryBuilder()
      .select('employee')
      .from(Employee, 'employee')
      .where('employee.email = :email', { email })
      .addSelect('employee.password')
      .getOne();
  }

  async findAllEmployees(): Promise<any[]> {
    return this.employeeRepository.find({
      relations: ['parent', 'children', 'photos', 'position'],
    });
  }

  async findEmployee(id: string): Promise<Employee> {
    return this.employeeRepository.findOne({
      where: { id },
      relations: ['parent', 'children', 'photos', 'position'],
    });
  }

  async addEmployee(employee: CreateEmployeeDTO): Promise<Employee> {
    console.log(employee.password, this.configService.get('SALT'));

    employee.password = await bcrypt.hash(
      employee.password ?? '12345678',
      Number(this.configService.get('SALT')),
    );
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
