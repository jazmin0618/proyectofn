import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService} from '@nestjs/jwt';

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
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.usersService.create({
      email: data.email,
      name: data.name,
      password: hashedPassword,
      career: data.career,
      study_level: data.study_level,
    });
    // No devolver la contraseña
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new Error('Usuario no encontrado');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Contraseña incorrecta');

    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { token };
  }
}
