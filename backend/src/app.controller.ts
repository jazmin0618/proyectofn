import { Body, Controller, Get, Ip, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private configService: ConfigService,
    private readonly appService: AppService,
    private dataSource: DataSource
  ) {}
  
  private requestCount = new Map<string, number>();

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // ============ ENDPOINTS PARA BASE DE DATOS ============

  @Get('db-users')
  async getAllUsers() {
    try {
      console.log('🔍 Obteniendo usuarios de la base de datos...');
      
      // 1. Primero descubrir los nombres EXACTOS de las columnas
      const columns = await this.dataSource.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_name = 'user'
        ORDER BY ordinal_position
      `);
      
      console.log('📋 Columnas encontradas:', columns);
      
      // 2. Construir SELECT con nombres correctos (comillas para mayúsculas)
      const columnNames = columns.map(c => {
        const name = c.column_name;
        // PostgreSQL: si tiene mayúsculas, necesita comillas dobles
        if (name !== name.toLowerCase()) {
          return `"${name}" as "${name}"`;
        }
        return name;
      }).join(', ');
      
      console.log('🔧 Query columns:', columnNames);
      
      // 3. Obtener usuarios
      const users = await this.dataSource.query(`
        SELECT 
          ${columnNames},
          CASE 
            WHEN password IS NULL THEN 'Google User'
            ELSE 'Email/Password User'
          END as auth_type,
          CASE 
            WHEN google_id IS NOT NULL THEN '✅ Sí'
            ELSE '❌ No'
          END as tiene_google_id
        FROM "user" 
        ORDER BY id
      `);
      
      // 4. Estadísticas
      const stats = await this.dataSource.query(`
        SELECT 
          COUNT(*) as total_usuarios,
          COUNT(CASE WHEN password IS NULL THEN 1 END) as usuarios_google,
          COUNT(CASE WHEN password IS NOT NULL THEN 1 END) as usuarios_normales,
          COUNT(CASE WHEN google_id IS NOT NULL THEN 1 END) as con_google_id
        FROM "user"
      `);
      
      return {
        success: true,
        message: `✅ Base de datos conectada. ${stats[0].total_usuarios} usuarios encontrados.`,
        estadisticas: {
          total: stats[0].total_usuarios,
          google: stats[0].usuarios_google,
          email_password: stats[0].usuarios_normales,
          con_google_id: stats[0].con_google_id
        },
        columnas_en_tabla: columns,
        usuarios: users,
        timestamp: new Date().toISOString(),
        nota: 'Usa /db-fix si hay problemas con NOT NULL constraints'
      };
      
    } catch (error) {
      console.error('❌ Error en db-users:', error);
      return {
        success: false,
        error: error.message,
        error_detallado: {
          codigo: error.code,
          detalle: error.detail,
          tabla: error.table,
          columna: error.column
        },
        solucion: 'Verifica que la tabla "user" exista y tenga datos'
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
        AND column_name IN ('password', 'career', 'study_level', 'foto', 'google_id')
      `);
      
      console.log('📋 Estado antes:', before);
      
      // 2. Arreglar columnas si es necesario
      const columnsToFix = ['password', 'career', 'study_level', 'foto', 'google_id'];
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
        ORDER BY column_name
      `);
      
      // 4. Contar usuarios
      const countResult = await this.dataSource.query('SELECT COUNT(*) as total FROM "user"');
      const userCount = parseInt(countResult[0].total);
      
      // 5. Obtener lista de usuarios (solo email y tipo)
      const userList = await this.dataSource.query(`
        SELECT 
          id,
          email,
          name,
          CASE WHEN password IS NULL THEN 'Google' ELSE 'Normal' END as tipo
        FROM "user" 
        ORDER BY id
        LIMIT 10
      `);
      
      return {
        success: true,
        message: fixesApplied.length > 0 
          ? `🎉 Base de datos reparada. ${fixesApplied.length} cambios aplicados.` 
          : '✅ Base de datos ya está correctamente configurada.',
        cambios_aplicados: fixesApplied,
        total_usuarios: userCount,
        lista_usuarios: userList,
        columnas_antes: before,
        columnas_despues: after.filter(c => columnsToFix.includes(c.column_name)),
        todas_las_columnas: after,
        siguiente_paso: 'Prueba el login con Google en https://proyectofn.vercel.app'
      };
      
    } catch (error) {
      console.error('❌ Error en db-fix:', error);
      return {
        success: false,
        error: error.message,
        sugerencia: 'Verifica que TypeORM tenga permisos para alterar tablas'
      };
    }
  }

  @Get('db-status')
  async dbStatus() {
    try {
      // 1. Verificar conexión
      await this.dataSource.query('SELECT 1');
      
      // 2. Contar usuarios
      const countResult = await this.dataSource.query('SELECT COUNT(*) as total FROM "user"');
      const userCount = parseInt(countResult[0].total);
      
      // 3. Obtener últimos usuarios
      const recentUsers = await this.dataSource.query(`
        SELECT 
          id,
          email,
          name,
          CASE 
            WHEN password IS NULL THEN 'Google'
            ELSE 'Email/Password'
          END as tipo,
          "isActive" as activo
        FROM "user" 
        ORDER BY id DESC
        LIMIT 5
      `);
      
      // 4. Verificar problemas comunes
      const problems = [];
      
      // Usuarios de Google sin google_id
      const googleUsersNoId = await this.dataSource.query(`
        SELECT COUNT(*) as count 
        FROM "user" 
        WHERE password IS NULL AND google_id IS NULL
      `);
      
      if (parseInt(googleUsersNoId[0].count) > 0) {
        problems.push(`${googleUsersNoId[0].count} usuarios de Google sin google_id`);
      }
      
      // Columnas con NOT NULL que deberían ser nullable
      const notNullColumns = await this.dataSource.query(`
        SELECT column_name
        FROM information_schema.columns 
        WHERE table_name = 'user' 
          AND is_nullable = 'NO'
          AND column_name IN ('password', 'foto', 'career', 'study_level', 'google_id')
      `);
      
      if (notNullColumns.length > 0) {
        problems.push(`Columnas con NOT NULL: ${notNullColumns.map(c => c.column_name).join(', ')}`);
      }
      
      return {
        estado: '✅ Base de datos operativa',
        timestamp: new Date().toISOString(),
        resumen: {
          total_usuarios: userCount,
          ultimos_registros: recentUsers,
          problemas_detectados: problems.length > 0 ? problems : 'Ninguno ✅'
        },
        endpoints_utiles: {
          ver_usuarios: '/db-users',
          reparar_bd: '/db-fix',
          login_google: 'https://proyectofn.vercel.app'
        }
      };
      
    } catch (error) {
      return {
        estado: '❌ Problema de conexión',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  @Get('db-test-simple')
  async dbTestSimple() {
    // Versión SUPER simple solo para ver si hay conexión
    try {
      const result = await this.dataSource.query('SELECT id, email FROM "user" LIMIT 5');
      return {
        conexion: '✅ OK',
        usuarios_ejemplo: result,
        total: result.length
      };
    } catch (error) {
      return {
        conexion: '❌ ERROR',
        error: error.message
      };
    }
  }
  @Get('env-check')
  checkEnv() {
    return {
      dbHost: this.configService.get('DATABASE_URL')?.split('@')[1]?.split('/')[0] || 'No configurada',
      nodeEnv: this.configService.get('NODE_ENV'),
      openAiKeyConfigured: !!this.configService.get('OPENAI_API_KEY'),
      timestamp: new Date().toISOString()
    };
  }
}