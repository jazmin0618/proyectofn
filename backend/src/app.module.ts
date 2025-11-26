import { Module } from '@nestjs/common';
import { AppController } from './app.controller'; // Asume que existe
import { AppService } from './app.service';     // Asume que existe
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'',
      database:'baseia',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize:true,
      connectorPackage:'mysql2',
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}