import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
  TypeOrmModule.forRoot({
    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'baseia',
      autoLoadEntities: true,
      synchronize: true,
  }),
    AuthModule,
    UsersModule,
 ],
})
export class AppModule {}
