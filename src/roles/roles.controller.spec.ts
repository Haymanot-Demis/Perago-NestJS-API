import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RolesModule } from './roles.module';
import { Role } from './entities/role.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import supertest from 'supertest';

describe('RolesController', () => {
  let controller: RolesController;
  const mockeRoleService = {
    create: jest.fn((dto): any => {
      // if (dto.name.length < 2) {
      //   return new Error('name must be at least 2 characters long');
      // }
      console.log('in mock service');

      return { id: '1', ...dto };
    }),
    findAll: jest.fn(() => {
      return [{ id: '1', name: 'test', description: 'test' }];
    }),
    getHierarchy: jest.fn((id) => {
      return { id: '1' };
    }),
    findOne: jest.fn((id) => {
      return { id, name: 'test', description: 'test' };
    }),
    update: jest.fn((id, dto) => {
      return new UpdateResult();
    }),
    remove: jest.fn((id) => {
      return new DeleteResult();
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [RolesService],
    })
      .overrideProvider(RolesService)
      .useValue(mockeRoleService)
      .compile();

    controller = module.get<RolesController>(RolesController);
  });

  it('should create and return role object', async () => {
    const mockedController = jest.spyOn(controller, 'create');
    const dto = { name: 'test', description: 'test' };
    const result = await controller.create(dto);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('description');
    expect(mockedController).toBeCalledWith(dto);
  });

  it('should return array of roles', async () => {
    const mockedController = jest.spyOn(controller, 'findAll');
    const result = await controller.findAll();
    expect(result).toBeInstanceOf(Array);
    expect(mockedController).toBeCalled();
  });

  it('should return role object', async () => {
    const mockedController = jest.spyOn(controller, 'findOne');
    const result = await controller.findOne('1');
    expect(result).toHaveProperty('id');
    expect(mockedController).toBeCalledWith('1');
  });

  it('should return role hierarchy', async () => {});

  it('should update role', async () => {
    const mockedController = jest.spyOn(controller, 'update');
    const dto = { name: 'test', description: 'test', parent: '2' };
    const result = await controller.update('1', dto);
    expect(result).toBeInstanceOf(UpdateResult);
    expect(mockedController).toBeCalledWith('1', dto);
  });

  it('should delete role', async () => {
    const mockedController = jest.spyOn(controller, 'remove');
    const result = await controller.remove('1');
    expect(result).toBeInstanceOf(DeleteResult);
    expect(mockedController).toBeCalledWith('1');
  });
});
