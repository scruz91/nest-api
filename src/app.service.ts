import { Injectable } from '@nestjs/common';
import * as oracledb from 'oracledb';

@Injectable()
export class AppService {
  private oracleConfig = {
    user: process.env.ORACLE_USER || 'system',
    password: process.env.ORACLE_PASSWORD || 'oracle',
    connectString: process.env.ORACLE_HOST || '172.21.16.217:49161/XE'
  };

  async getConsultaTasas(): Promise<any> {
    let connection;

    try {
      // Establecer conexión con la base de datos
      connection = await oracledb.getConnection(this.oracleConfig);

      // Realizar la consulta
      const result = await connection.execute(
        `SELECT * FROM TASAS`, // Reemplaza por tu consulta SQL
        [], // Parámetros si es necesario
        { outFormat: oracledb.OUT_FORMAT_OBJECT } // Retornar resultados como JSON
      );

      // Retornar resultados
      return result.rows;

    } catch (error) {
      console.error('Error ejecutando la consulta', error);
      throw new Error('Error en la consulta a la base de datos');
    } finally {
      // Cerrar la conexión
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          console.error('Error cerrando la conexión', error);
        }
      }
    }
  }
}
