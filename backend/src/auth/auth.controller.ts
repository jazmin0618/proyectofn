import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') //  ruta base /auth
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register') //  Ruta completa: /auth/register
  async register(@Body() data: any) {
    try {
      const user = await this.authService.register(data);
      return {
        success: true,
        message: 'Usuario creado exitosamente',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al crear usuario',
      };
    }
  }

  @Post('login') //  Ruta completa: /auth/login
  async login(@Body() data: { email: string; password: string }) {
    try {
      const result = await this.authService.login(data.email, data.password);
      return {
        success: true,
        ...result,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al iniciar sesión',
      };
    }
  }
}