import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeLevelColumn,
  TreeParent,
} from 'typeorm';
import { Photo } from '../../photos/entities/photo.entity';

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

  @Column()
  email: string;

  @Column()
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
