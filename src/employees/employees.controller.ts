import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ParseIntPipe,
  UsePipes,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { EmployeesService } from './employees.service';
import {
  CreateEmployeeDTO,
  createEmployeeJoiSchema,
} from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
import { DeleteResult, InsertResult, TreeRepository } from 'typeorm';
import { updateEmployeeDTO } from './dto/update-employee.dto';
import { JoiValidationPipe } from './employee-joi-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PhotosService } from '../photos/photos.service';

const storage = diskStorage({
  destination: './uploads/profiles',
  filename: (req, file, cb) => {
    const filename: string = file.originalname;
    const splited = filename.split('.');
    const extention: string = splited[splited.length - 1];
    cb(null, `${Date.now()}.${extention}`);
  },
});

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService = null,
    private readonly photosService: PhotosService = null,
  ) {}
  @Get()
  findAllEmployees(): Promise<any[]> {
    return this.employeesService.findAllEmployees();
  }

  @Get('/some')
  async find(@Query() query_string: CreateEmployeeDTO): Promise<Employee[]> {
    return this.employeesService.find(query_string);
  }

  @Get(':id')
  async findEmployee(@Param('id') id: string): Promise<Employee> {
    const emp = await this.employeesService.findEmployee(id);
    return emp;
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('photo', { storage, limits: { fileSize: 5120000 } }),
  )
  // @UsePipes(new JoiValidationPipe(createEmployeeJoiSchema))
  // @Body(new JoiValidationPipe(createEmployeeJoiSchema))
  async addEmployee(
    @Body(new JoiValidationPipe(createEmployeeJoiSchema))
    employee: CreateEmployeeDTO,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<Employee> {
    // console.log('e', employee);
    // console.log('f', photo);
    const emp = await this.employeesService.addEmployee(employee);
    if (photo) {
      const photoInsertRes = await this.photosService.create({
        URI: photo.path,
        employee: emp,
      });
    }
    return this.employeesService.findEmployee(emp.id);
  }

  @Put(':id')
  updateEmployee(
    @Param('id') id: string,
    @Body() employee: updateEmployeeDTO,
  ): Promise<Employee> {
    console.log(id, employee);

    return this.employeesService.updateEmployee(id, employee);
  }

  @Delete()
  removeAllEmployee(): Promise<DeleteResult> {
    return this.employeesService.removeAllEmployees();
  }

  @Delete(':id')
  removeEmployee(@Param('id') id: string): Promise<DeleteResult> {
    return this.employeesService.removeEmployee(id);
  }
}
