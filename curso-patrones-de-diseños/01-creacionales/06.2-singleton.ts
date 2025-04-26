/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 */

import { COLORS } from '../helpers/colors.ts';

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connected: boolean = false;

  // Constructor privado para evitar instancias directas
  private constructor() {}

  // Método estático para obtener la instancia única
  public static getInstance(): DatabaseConnection {
    // Completar: implementar el patrón Singleton
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection()
      console.log('Se ha creado la instancia a la base de datos');
    }
    return DatabaseConnection.instance
  }

  // Método para conectar a la base de datos
  public connect(): void {
    // Completar: si no está conectado, mostrar mensaje de conexión
    if (!this.connected) {
      this.connected = true
      console.log('Se ha conectado exitosamente a la base de datos');
    } else{
      console.log('Ya se encuentra conectado a la base de datos a la base de datos');
    }
  }
  // Método para desconectar de la base de datos
  public disconnect(): void {
    if (this.connected) {
      this.connected = false
      console.log(`Se ha descontado exitosamente a la base de datos`);
    } else{
      console.log('No hay una conexion activa');
      
    }
  }
}

// Pruebas
function main() {
  const db1 = DatabaseConnection.getInstance();
  db1.connect(); // Debería conectar a la base de datos

  const db2 = DatabaseConnection.getInstance();
  db2.connect(); // Debería mostrar que ya existe una conexión activa

  console.log('Son iguales:', db1 === db2); // Debería mostrar true

  db1.disconnect(); // Debería cerrar la conexión

  db2.connect(); // Ahora debería conectar de nuevo, ya que se cerró la anterior
}

main();
