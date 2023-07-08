import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import {
  DataSource,
  InsertQueryBuilder,
  InsertResult,
  Repository,
} from 'typeorm';

describe('RolesService', () => {
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Role),
          useValue: {
            find: jest.fn().mockImplementation((...rest) => {
              return [{ id: '1' }];
            }),
            findOne: jest.fn().mockImplementation((id, ...rest) => {
              return { id, name: 'test', description: 'test' };
            }),
            create: jest.fn().mockImplementation((dto) => {
              return Promise.resolve(new InsertResult());
            }),
            save: jest.fn().mockImplementation((role) => {
              return role;
            }),
            update: jest.fn().mockImplementation((id, dto, ...rest) => {
              return { id: id, ...dto };
            }),
            delete: jest.fn().mockImplementation((id) => {
              return { id };
            }),
          },
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a role', async () => {
    const mockedCreate = jest.spyOn(service, 'create');
    const result = await service.create({ name: 'test' });
    expect(result).toBeInstanceOf(InsertResult);
    expect(mockedCreate).toHaveBeenCalled();
  });

  it('should find all roles', async () => {
    const mockedFindAll = jest.spyOn(service, 'findAll');
    const roles = await service.findAll();
    expect(roles).toEqual([{ id: '1' }]);
    expect(mockedFindAll).toHaveBeenCalled();
  });

  it('should find one role', async () => {
    const mockedFindOne = jest.spyOn(service, 'findOne');
    const role = await service.findOne('1');
    expect(role).toHaveProperty('id');
    expect(role).toHaveProperty('name');
    expect(role).toHaveProperty('description');
    expect(mockedFindOne).toHaveBeenCalled();
  });

  it('should update a role', async () => {
    const mockedUpdate = jest.spyOn(service, 'update');
    const updatedRole = { name: 'test' };
    const role = await service.update('1', updatedRole);
    expect(role).toEqual({ id: '1', ...updatedRole });
    expect(mockedUpdate).toHaveBeenCalled();
  });

  it('should delete a role', async () => {
    const mockedDelete = jest.spyOn(service, 'remove');
    const role = await service.remove('1');
    expect(role).toEqual({ id: '1' });
    expect(mockedDelete).toHaveBeenCalled();
  });

  it('should get hierarchy', async () => {
    const mockedGetHierarchy = jest.spyOn(service, 'getHierarchy');
    const role = await service.getHierarchy('1');
    expect(typeof role).toBe('object');
    expect(role).toHaveProperty('id');
    expect(role).toHaveProperty('name');
    expect(role).toHaveProperty('description');

    expect(mockedGetHierarchy).toHaveBeenCalled();
  });
});
