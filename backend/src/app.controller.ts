import { Body, Controller, Get, Ip, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';

@Controller() 
export class AppController {
  constructor(
  private readonly appService: AppService,
  private dataSource: DataSource) {}
  private requestCount = new Map<string, number>();

  @Get() 
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('db-users')
  async getAllUsers() {
    try {
      // 1. Obtener TODOS los usuarios con detalles
      const users = await this.dataSource.query(`
        SELECT 
          id,
          email,
          name,
          CASE 
            WHEN password IS NULL THEN 'Google User'
            ELSE 'Email/Password User'
          END as auth_type,
          CASE 
            WHEN google_id IS NOT NULL THEN google_id
            ELSE 'N/A'
          END as google_id,
          foto,
          career,
          study_level,
          isActive
        FROM "user" 
        ORDER BY id
      `);
      
      // 2. Estadísticas
      const stats = await this.dataSource.query(`
        SELECT 
          COUNT(*) as total_users,
          COUNT(CASE WHEN password IS NULL THEN 1 END) as google_users,
          COUNT(CASE WHEN password IS NOT NULL THEN 1 END) as normal_users
        FROM "user"
      `);
      
      // 3. Estructura de la tabla
      const structure = await this.dataSource.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_name = 'user'
        ORDER BY ordinal_position
      `);
      
      return {
        success: true,
        message: `✅ Base de datos conectada. ${stats[0].total_users} usuarios encontrados.`,
        statistics: stats[0],
        users: users,
        table_structure: structure,
        database_info: 'PostgreSQL en Render (conexión interna)',
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message,
        help: 'La tabla "user" podría no existir o no tener datos'
      };
    }
  }

  @Get('db-fix')
  async fixDatabase() {
    try {
      console.log('🔧 Ejecutando reparación de base de datos...');
      
      // 1. Verificar estado actual
      const before = await this.dataSource.query(`
        SELECT column_name, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = 'user' 
        AND column_name IN ('password', 'career', 'study_level')
      `);
      
      // 2. Arreglar columnas si es necesario
      const columnsToFix = ['password', 'career', 'study_level'];
      let fixesApplied = [];
      
      for (const column of columnsToFix) {
        const columnInfo = before.find(c => c.column_name === column);
        if (columnInfo && columnInfo.is_nullable === 'NO') {
          await this.dataSource.query(`
            ALTER TABLE "user" 
            ALTER COLUMN "${column}" DROP NOT NULL
          `);
          fixesApplied.push(`${column} → NULLABLE`);
          console.log(`✅ ${column} ahora acepta NULL`);
        }
      }
      
      // 3. Ver estado después
      const after = await this.dataSource.query(`
        SELECT column_name, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = 'user'
      `);
      
      // 4. Contar usuarios
      const users = await this.dataSource.query('SELECT COUNT(*) FROM "user"');
      
      return {
        success: true,
        message: fixesApplied.length > 0 
          ? `🎉 Base de datos reparada. ${fixesApplied.length} cambios aplicados.` 
          : '✅ Base de datos ya está correctamente configurada.',
        fixes_applied: fixesApplied,
        users_count: parseInt(users[0].count),
        columns_before: before,
        columns_after: after.filter(c => columnsToFix.includes(c.column_name)),
        next_step: 'Prueba el login con Google en https://proyectofn.vercel.app'
      };
      
    } catch (error) {
      console.error('❌ Error en db-fix:', error);
      return {
        success: false,
        error: error.message,
        suggestion: 'Verifica que TypeORM tenga permisos para alterar tablas'
      };
    }
  }
}