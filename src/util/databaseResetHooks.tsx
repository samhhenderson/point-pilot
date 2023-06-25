import { useEffect } from 'react';

import { useDispatch, useSelector} from 'react-redux';
import { getPlayers } from '../redux/playerSlice';
import { getGames } from '../redux/gameSlice';
import { getSessions } from '../redux/sessionSlice';
import { getPlayerSessions } from '../redux/playerSessionSlice';
import { getSettings } from '../redux/settingSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';

import { executeSqlAsync } from '../db/db-service';
import { State } from '../types';


export function useDropDatabase() {
  return async function dropTables() {
    try {
      await executeSqlAsync('PRAGMA foreign_keys = OFF;')
      await executeSqlAsync('DROP TABLE IF EXISTS players;')
      await executeSqlAsync('DROP TABLE IF EXISTS games;')
      await executeSqlAsync('DROP TABLE IF EXISTS sessions;')
      await executeSqlAsync('DROP TABLE IF EXISTS playerSessions;')
      await executeSqlAsync('DROP TABLE IF EXISTS settings;')
      await executeSqlAsync('PRAGMA foreign_keys = ON;')
      console.log('TABLES DROPPED')
    } catch (err) {
      console.log(err)
    }
  }
}

export function useCreateDatabase() {
  const dispatchThunk:ThunkDispatch<State, null, any> = useDispatch();
  const settings = useSelector((state:State) => state.setting.byId)
  return () => {
    const createPlayerTable = 
    `CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      icon TEXT DEFAULT 'none'
    );`
    executeSqlAsync(createPlayerTable)
    .catch(error => console.log('CREATE PLAYER TABLE ' + error))

    const createGameTable =
    `CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      lowScoreWins INTEGER CHECK(lowScoreWins IN (0,1)),
      useBid INTEGER CHECK(useBid IN (0,1)),
      teams INTEGER CHECK(teams IN (0,1))
    );`
    executeSqlAsync(createGameTable)
    .catch(error => console.log('CREATE GAME TABLE ' + error))

    const createSessionTable =
    `CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      gameId INTEGER,
      date TEXT,
      complete INTEGER CHECK(complete IN (0,1)),
      FOREIGN KEY(gameId) REFERENCES games(id)
    );`
    executeSqlAsync(createSessionTable)
    .catch(error => console.log('CREATE SESSION TABLE ' + error))

    const createPlayerSessionTable =
    `CREATE TABLE IF NOT EXISTS playerSessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      playerId INTEGER,
      sessionId INTEGER,
      score INTEGER DEFAULT 0,
      bid INTEGER DEFAULT 0,
      team INTEGER DEFAULT 1,
      place INTEGER DEFAULT 0,
      FOREIGN KEY(playerId) REFERENCES players(id),
      FOREIGN KEY(sessionId) REFERENCES sessions(id)
    );`
    executeSqlAsync(createPlayerSessionTable)
    .catch(error => console.log('CREATE SESSION TABLE ' + error))

    const createSettingsTable = 
    `CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      value BLOB
    );`
    const insertSettings =
    'INSERT OR IGNORE INTO settings (id, name, value) VALUES (?, ?, ?)'
    executeSqlAsync(createSettingsTable)
    .then(() => {
      for (const name in settings) {
        executeSqlAsync(insertSettings, [
          settings[name].id, 
          settings[name].name, 
          settings[name].value
        ])
      }
    })
    .then(() => dispatchThunk(getSettings()))
    .catch(error => console.log('CREATE SETTINGS TABLE ' + error))

    dispatchThunk(getPlayers());
    dispatchThunk(getGames());
    dispatchThunk(getSessions());
    dispatchThunk(getPlayerSessions());
  }
}
