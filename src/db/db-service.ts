import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('PlayerDB')

export function executeSqlAsync(sqlStatement: string, params: any[] = []) {
  return new Promise<SQLite.SQLResultSet>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sqlStatement,
        params,
        (tx, result) => resolve(result),
        (tx, error) => {reject(error); return true;}
      );
    });
  });
}
