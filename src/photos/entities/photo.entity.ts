import { IsFQDN } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsFQDN()
  URI: string;

  @ManyToOne(() => Employee, (employee) => employee.photos, {
    onDelete: 'CASCADE',
  })
  employee: Employee;
}
