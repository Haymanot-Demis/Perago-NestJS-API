import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  position: string;

  @OneToMany(() => Employee, (employee) => employee.parent, {
    cascade: true,
  })
  children: Employee[];

  @ManyToOne(() => Employee, (employee) => employee.children, {
    onDelete: 'SET NULL',
  })
  parent: Employee;

  @OneToMany(() => Photo, (photo) => photo.employee, {
    onDelete: 'CASCADE',
  })
  photos: Photo[];
}
