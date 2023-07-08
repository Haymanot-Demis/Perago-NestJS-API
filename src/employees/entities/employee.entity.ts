import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeLevelColumn,
  TreeParent,
} from 'typeorm';
import { Photo } from '../../photos/entities/photo.entity';
import { Role } from 'src/roles/entities/role.entity';

@Entity()
@Tree('closure-table', {
  ancestorColumnName: (column) => 'ancestor_id',
  descendantColumnName: (column) => 'descendant_id',
})
export class Employee {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, default: null })
  phone: string;

  @Column({ nullable: true, default: '12345678', select: false })
  password: string;

  @OneToOne(() => Role, (role) => role.employee)
  @JoinColumn()
  position: string;

  @OneToMany(() => Employee, (employee) => employee.parent)
  children: Employee[];

  @ManyToOne(() => Employee, (employee) => employee.children, {
    onDelete: 'NO ACTION',
  })
  parent: Employee;

  @OneToMany(() => Photo, (photo) => photo.employee, {
    onDelete: 'CASCADE',
  })
  photos: Photo[];
}
