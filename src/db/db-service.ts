import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('PlayerDB')

export function executeSqlAsync(sqlStatement: string, params: string[] = []) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sqlStatement,
        params,
        (_, result) => resolve(result),
        (_, error) => {reject(error); return true;}
      );
    });
  });
}
