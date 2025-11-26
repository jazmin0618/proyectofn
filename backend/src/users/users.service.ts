// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity'; // Importa tu entidad

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
  
  // Asume que esta es tu función de creación:
  create(userData: Partial<User>) {
    const newUser = this.usersRepository.create(userData);
    return this.usersRepository.save(newUser);
  }
  findById(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }
}