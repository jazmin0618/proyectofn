import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {
    const existingUser = await this.usersService.findByEmail(data.email);
    if (existingUser) {
      throw new Error('El correo electrónico ya está en uso');
    }
    //(Hash de contraseñas con bcrypt (10 rondas de salt))
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.usersService.create({
      email: data.email,
      name: data.name,
      password: hashedPassword,
      career: data.career,
      study_level: data.study_level,
    });
    
    // Eliminar password del objeto de respuesta(sirve para no exponer datos)
    const { password, ...userWithoutPassword } = user;
    
    // Generar token
    const token = this.jwtService.sign({ id: user.id, email: user.email });
    
    return {
      success: true,
      access_token: token,
      user: userWithoutPassword,
    };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new Error('Usuario no encontrado');
   //(Comaparacion segura de contraseñas)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Contraseña incorrecta');

    // Generar token, 
    const token = this.jwtService.sign({ id: user.id, email: user.email });
    
    // Eliminar password del objeto de respuesta
    const { password: userPassword, ...userWithoutPassword } = user;
    
    return {
      success: true,
      access_token: token,
      user: userWithoutPassword,
    };
  }
} 
