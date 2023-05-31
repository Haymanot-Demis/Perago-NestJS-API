import { Employee } from '../entities/employee.entity';

export class CreateEmployeeDTO {
  firstname: string;
  lastname: string;
  email: string;
  postion: string;
  parentId: string;
}
