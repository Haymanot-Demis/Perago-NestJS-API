import { IsNotEmpty } from 'class-validator';
import { Employee } from 'src/employees/entities/employee.entity';
export class CreatePhotoDto {
  @IsNotEmpty()
  URI: string;

  @IsNotEmpty()
  employee: Employee;
}
