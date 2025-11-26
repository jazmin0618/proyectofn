// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity'; // Importa tu entidad

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Agrega la entidad User
  ],
  providers: [UsersService],
  exports: [UsersService], // MUY IMPORTANTE: Expórtalo para que AuthModule pueda usarlo
})
export class UsersModule {}