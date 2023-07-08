import { Module } from '@nestjs/common';
import {} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EmployeesModule } from './employees/employees.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { PhotosModule } from './photos/photos.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'PERAGO HR',
      autoLoadEntities: true,
      synchronize: true,
      // logging: true,
    }),
    EmployeesModule,
    PhotosModule,
    RolesModule,
    AuthModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    console.log(dataSource.toString());
  }
}
