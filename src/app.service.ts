import { Injectable, Inject } from '@nestjs/common';
import { PhotoEntity } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to Perago HR';
  }
}
