import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RecaptchaService } from './recaptcha.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService, 
    private recaptchaService: RecaptchaService,
  ) {}

  @Post('register')
  async register(
    @Body() data: { 
      name: string; 
      email: string; 
      password: string; 
      career?: string; 
      study_level?: string;
      recaptchaToken?: string; // ¡AÑADIR ESTO!
    },
  ) {
    try {
      // Verificar reCAPTCHA si el token está presente
      if (data.recaptchaToken) {
        await this.recaptchaService.verify(data.recaptchaToken);
      }
      
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
  async login(
    @Body() data: { email: string; password: string, recaptchaToken?: string },
  ) {
    try {
      // Verificar reCAPTCHA si el token está presente
      if (data.recaptchaToken) {
        await this.recaptchaService.verify(data.recaptchaToken);
      }
      
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