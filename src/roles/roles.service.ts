import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}
  async create(role: CreateRoleDto): Promise<InsertResult> {
    this.roleRepository.create(role);
    this.roleRepository.save(role);
    return Promise.resolve(new InsertResult());

    return this.roleRepository
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values(role)
      .execute();
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find({ relations: ['children'] });
  }

  async getHierarchy(id: string): Promise<Role> {
    const parent = await this.findOne(id);
    const children = parent.children ?? [];

    for (let i = 0; i < children.length; i++) {
      const subtree = await this.getHierarchy(children[i].id);
      children[i] = subtree;
    }

    return parent;
  }

  async findOne(id: string): Promise<Role> {
    return this.roleRepository.findOne({
      where: { id },
      relations: ['children'],
    });
  }

  async update(id: string, updatedRole: UpdateRoleDto): Promise<UpdateResult> {
    return this.roleRepository.update(id, updatedRole);
    return this.roleRepository
      .createQueryBuilder()
      .update(Role)
      .set(updatedRole)
      .where({ id })
      .execute();
  }

  async remove(id: string): Promise<DeleteResult> {
    const emp = await this.roleRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });

    if (!emp) {
      return this.roleRepository.delete(id);
    }
    this.roleRepository.update({ parent: emp }, { parent: emp.parent });
    return this.roleRepository.delete(id);

    this.roleRepository
      .createQueryBuilder()
      .update(Role)
      .set({ parent: emp.parent })
      .where({ parent: emp })
      .execute();
    return this.roleRepository.delete(id);
  }
}
