import {open, QuickSQLiteConnection} from 'react-native-quick-sqlite';
import {DB_NAME, SCHEMA_SQL} from './schema';

let db: QuickSQLiteConnection | null = null;

export const initDatabase = async (): Promise<void> => {
  try {
    if (db) {
      console.log('Database already initialized');
      return;
    }

    db = open({name: DB_NAME});

    // Execute schema
    db.execute(SCHEMA_SQL);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
};

export const getDatabase = (): QuickSQLiteConnection => {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
};

export const closeDatabase = (): void => {
  if (db) {
    db.close();
    db = null;
    console.log('Database closed');
  }
};

// Export database operations
export * from './operations/entries';
export * from './operations/tags';
export * from './operations/templates';
export * from './operations/settings';
export * from './operations/stats';
