import { IsNotEmpty } from 'class-validator';
import { Employee } from '../../employees/entities/employee.entity';
export class CreatePhotoDto {
  @IsNotEmpty()
  URI: string;

  @IsNotEmpty()
  employee: Employee;
}
