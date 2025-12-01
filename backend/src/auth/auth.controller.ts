import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data: any) {
    try {
      const result = await this.authService.register(data);
      return result; // Ya incluye success, access_token y user
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Error al crear usuario',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    try {
      const result = await this.authService.login(data.email, data.password);
      return result; // Ya incluye success, access_token y user
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Error al iniciar sesión',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}