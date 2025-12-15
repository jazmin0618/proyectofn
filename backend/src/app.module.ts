import { Module } from '@nestjs/common';
import { AppController } from './app.controller'; 
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';     
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { InteractionsModule } from './interactions/interactions.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),  
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';
        if (isProduction) {
          return {
           type: 'postgres',
           url: configService.get<string>('DATABASE_URL'), // <-- ¡USAR DATABASE_URL!
           ssl: { rejectUnauthorized: false }, 
           entities: [__dirname + '/**/*.entity{.ts,.js}'],
           synchronize: false, 
           };
    }
        // Configuración BASE (común para MySQL y PostgreSQL)
        const baseConfig = {
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASS'),
          database: configService.get<string>('DB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: !isProduction, // Solo en desarrollo
        };
        
        
        /*// PostgreSQL para producción (Render)
        if (isProduction) {
          return {
            ...baseConfig,
            type: 'postgres',
            ssl: { rejectUnauthorized: false }, // SSL para Render
          };
        } */
       
        // MySQL para desarrollo local (XAMPP)
        return {
          ...baseConfig,
          type: 'mysql',
          connectorPackage: 'mysql2',
        };
      },
    }),
    UsersModule,
    RecommendationsModule,
    InteractionsModule,
    AuthModule,
    // ... tus otros módulos
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}