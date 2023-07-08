import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Sign } from 'crypto';
import { SignInDto } from './dto/signin.dto';
import { Public } from 'src/app.constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Body() credentials: SignInDto) {
    return this.authService.signIn(credentials.email, credentials.password);
  }
}
