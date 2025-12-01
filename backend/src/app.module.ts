import { Module } from '@nestjs/common';
import { AppController } from './app.controller'; 
import {ConfigModule, ConfigService} from '@nestjs/config';
import { AppService } from './app.service';     
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { config } from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
      type:'mysql',
      host:'dpg-d4motk7diees739dm8d0-a',
      port:5432,
      username:'backend_aah0_user',
      password:'TTW18FzUCBSzxXzOfu9nX3XqhWM3mC4k',
      database:'backend_aah0',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize:true,
      connectorPackage:'mysql2',
      }),
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}