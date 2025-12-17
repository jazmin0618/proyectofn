import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module' ;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
    'https://proyectofn.vercel.app',
    'https://proyectofn-*.vercel.app', // Acepta todos los subdominios
    'http://localhost:3000' // Para desarrollo local
  ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Server running on port ${port}`);
}
bootstrap();
