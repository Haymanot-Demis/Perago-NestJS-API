import { IsOptional, Length } from 'class-validator';
import { Employee } from 'src/employees/entities/employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Length(2)
  name: string;

  @Column({ nullable: true, default: '' })
  description: string;

  @OneToOne(() => Employee, (employee) => employee.position)
  employee: Employee;

  @OneToMany(() => Role, (role) => role.parent)
  children: Role[];

  @ManyToOne(() => Role, (role) => role.children, { onDelete: 'NO ACTION' })
  parent: Role;
}
