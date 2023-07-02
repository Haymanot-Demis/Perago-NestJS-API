import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, createRoleJoiSchema } from './dto/create-role.dto';
import { UpdateRoleDto, updateRoleJoiSchema } from './dto/update-role.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Role } from './entities/role.entity';
import { RolesJoiValidationPipe } from './roles-joi-validation-schema.pipe';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(
    @Body(new RolesJoiValidationPipe(createRoleJoiSchema)) role: CreateRoleDto,
  ): Promise<InsertResult> {
    return this.rolesService.create(role);
  }

  @Get()
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get('/hierarchy/:id')
  async getHierarchy(@Param('id') rootId: string): Promise<Role> {
    return this.rolesService.getHierarchy(rootId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new RolesJoiValidationPipe(updateRoleJoiSchema))
    updateRoleDto: UpdateRoleDto,
  ): Promise<UpdateResult> {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.rolesService.remove(id);
  }
}
