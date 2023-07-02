import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';
import { InsertResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
  ) {}
  async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    const res = await this.photoRepository
      .createQueryBuilder()
      .insert()
      .into(Photo)
      .values(createPhotoDto)
      .execute();

    return this.findOne(res.identifiers[0].id);
  }

  findAll() {
    return `This action returns all photos from db`;
  }

  async findOne(id: string): Promise<Photo> {
    return this.photoRepository.findOne({ where: { id } });
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  remove(id: number) {
    return `This action removes a #${id} photo`;
  }
}
