import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';


@Controller('auth/google')
export class GoogleAuthController {
  constructor(
    private googleAuthService: GoogleAuthService,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  async googleLogin(@Body() body: { token: string }) {
    const { token } = body;
    
    if (!token) {
      throw new HttpException('Token requerido', HttpStatus.BAD_REQUEST);
    }

    // 1. Verificar token
    const verification = await this.googleAuthService.verifyToken(token);
    
    if (!verification.success) {
      throw new HttpException(verification.message, HttpStatus.UNAUTHORIZED);
    }

    const { user: googleUser } = verification;

    // 2. Buscar usuario
    let user = await this.usersService.findByEmail(googleUser.email);
    
    if (!user) {
      // Crear nuevo usuario - USA LOS NOMBRES EXACTOS DE TU ENTIDAD
      user = await this.usersService.create({
        email: googleUser.email,
        name: googleUser.name,
        foto: googleUser.picture, // <-- 'foto' no 'photo'
        googleId: googleUser.googleId, // <-- 'google_id' si tu columna se llama así
      });
    } else if (!user.googleId) { // <-- 'googleId' (camelCase) si así está en la entidad
      // Actualizar usuario existente
      await this.usersService.update(user.id, {
        googleId: googleUser.googleId,
        foto: googleUser.picture,
      });
      // Volver a obtener el usuario actualizado
      user = await this.usersService.findByEmail(googleUser.email);
    }

    // 3. Generar JWT - Asegúrate de que este método exista
    const access_token = await this.authService.generateToken(user);

    // 4. Retornar respuesta
    return {
      success: true,
      access_token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        foto: user.foto, // <-- Aquí también
      },
    };
  }
}