import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from 'src/employees/employees.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: EmployeesService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findEmployeeByEmail(email);
    const payload = { email: user?.email, sub: user?.id };
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('isMatch', isMatch);
    console.log('user', user);

    if (!user || !isMatch) {
      throw new UnauthorizedException();
    }

    const token = await this.jwtService.signAsync(payload, {
      secret: new ConfigService().get('JWT_SECRET'),
      expiresIn: '1d',
    });
    return { token };
  }
}
