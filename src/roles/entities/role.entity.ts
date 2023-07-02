import { Length } from 'class-validator';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('closure-table')
export class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Length(2)
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Role, (role) => role.parent)
  children: Role[];

  @ManyToOne(() => Role, (role) => role.children, { onDelete: 'NO ACTION' })
  parent: Role;
}
