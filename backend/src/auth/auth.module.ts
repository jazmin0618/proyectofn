import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { RecaptchaService } from './recaptcha.service';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthService } from './google-auth.service';

@Module({
  imports: [
    UsersModule, 
    JwtModule.register({
      secret: 'MICLAVESECRETA', // Cambia esto por una clave segura
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, RecaptchaService, GoogleAuthService],
  controllers: [AuthController, GoogleAuthController],
  exports:[RecaptchaService, GoogleAuthService]
})

export class AuthModule {}