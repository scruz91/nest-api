import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as oracledb from 'oracledb';

async function bootstrap() {
  const oracleLibDir = process.env.ORACLE_LIB_DIR; // 'C://oracle//instantclient_23_7'
  if (!oracleLibDir) {
    throw new Error('La variable de entorno ORACLE_LIB_DIR no está definida');
  }
  
  oracledb.initOracleClient({
    libDir: oracleLibDir,
  });

  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000; // Escucha en el puerto que define Cloud Run o en el puerto 3000 por defecto
  await app.listen(port);
}
bootstrap();