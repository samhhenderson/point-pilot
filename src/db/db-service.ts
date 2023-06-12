import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('PlayerDB')

export default db;