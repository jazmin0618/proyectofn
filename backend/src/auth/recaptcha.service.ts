import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RecaptchaService {
  async verify(token: string): Promise<void> {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    console.log('🔐 Verificando reCAPTCHA con secret:', secret?.substring(0, 10) + '...');
    console.log('🔑 Token recibido:', token?.substring(0, 20) + '...');

    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret,
          response: token,
        },
      },
    );
     console.log('📋 Respuesta de reCAPTCHA:', response.data);

    if (!response.data.success) {
      console.error('❌ reCAPTCHA falló:', response.data);
      throw new UnauthorizedException('reCAPTCHA inválido');
    }
    console.log('✅ reCAPTCHA verificado con éxito');
  }
}
