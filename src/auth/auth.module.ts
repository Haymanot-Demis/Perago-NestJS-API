import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { EmployeesModule } from 'src/employees/employees.module';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role-based.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: new ConfigService().get('JWT_SECRET'),
      signOptions: { expiresIn: '1d' },
    }),
    EmployeesModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AuthModule {}
