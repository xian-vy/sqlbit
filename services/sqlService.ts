import alasql from 'alasql';
import { SqlQueryResult } from '@/types/sql';
import { tableData } from '@/data/schema';

// Initialize AlaSQL with our predefined tables
export const initializeAlaSql = () => {
  // Drop existing tables if they exist
  Object.keys(tableData).forEach(tableName => {
    try {
      alasql(`DROP TABLE IF EXISTS ${tableName}`);
    } catch (error) {
      console.error(`Error dropping table ${tableName}:`, error);
    }
  });

  // Create tables and insert data
  Object.entries(tableData).forEach(([tableName, data]) => {
    try {
      // Create table based on the first row's structure
      if (data.length > 0) {
        const columns = Object.keys(data[0]).map(key => `${key}`).join(', ');
        alasql(`CREATE TABLE ${tableName} (${columns})`);
        
        // Insert data
        data.forEach(row => {
          alasql(`INSERT INTO ${tableName} VALUES ?`, [row]);
        });
      }
    } catch (error) {
      console.error(`Error creating table ${tableName}:`, error);
    }
  });
};

export const executeQuery = (query: string): { results: SqlQueryResult[] | null; error: string | null } => {
  try {
    const results : SqlQueryResult[] = alasql(query);
    return { results, error: null };
  } catch (error) {
    console.error('SQL execution error:', error);
    return { 
      results: null, 
      error: error instanceof Error ? error.message : 'Unknown error executing query' 
    };
  }
};