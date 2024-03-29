import { NavigationProp, RouteProp } from "@react-navigation/native";

//PLAYER
export interface Player {
  id: number
  name: string,
  icon: string,
  deleted: boolean,
}

export interface PlayerState {
  byId: {
    [key: number]: Player
  },
  allIds: number[],
}

//MODALS
export interface ModalsState {
  number: {
    vis: boolean,
    playerSessionId: number,
    isBid: boolean
  }
  newGame: {
    vis: boolean,
    gameId: number,
  }
  confirm: {
    vis: boolean,
    message: string,
    confirmFunc: string,
    confirmArgs?: any[],
    confirmed: boolean,
  }
}

//GAME
export interface Game {
  id: number,
  name: string,
  lowScoreWins: boolean,
  useBid: boolean,
  teams: boolean,
  display: boolean,
  deleted: boolean,
}

export interface GameState {
  byId: {
    [key: number]: Game
  },
  allIds: number[],
}

//SESSION
export interface Session {
  id: number,
  date: string,
  gameId: number,
  complete: boolean,
}

export interface SessionState {
  byId: {
    [key: number]: Session
  },
  allIds: number[],
}

//PLAYERSESSION
export interface PlayerSession {
  id: number,
  playerId: number,
  sessionId: number,
  score: number,
  bid: number,
  team: number,
  place: number,
}

export type PlayerSessionIdPlace = {
  playerSessionId: number,
  place: number,
}

export interface PlayerSessionState {
  tempById: {
    [key: number]: PlayerSession
  },
  byId: {
    [key: number]: PlayerSession
  },
  allIds: number[],
}

//SETTING
export interface Setting {
  id: number,
  name: string,
  value: string | number | boolean,
}

export interface SettingState {
  byId: {
    [key: string]: Setting
  },
}

export interface State {
  player: PlayerState,
  modals: ModalsState,
  game: GameState,
  session: SessionState,
  playerSession: PlayerSessionState,
  setting: SettingState,
}

export type NavigationPropType = NavigationProp<
  { 
    Home: undefined, 
    SessionView: {sessionId: number}, 
    History: undefined, 
    Settings: undefined,
    Game: undefined,
  }, 
  'Home' | 'SessionView' | 'History' | 'Settings' | 'Game'
>

export interface SessionModalState {
  vis: boolean,
  thisSession: Session | null,
  playerSessionIdPlaces: PlayerSessionIdPlace[],
}

export interface ConfirmModalState {
  vis: boolean,
  message: string,
  confirmFunc: any,
  cancelFunc: any,
}

export interface Log {
  id: number,
  playerSessionId: number,
  pointDelta: number,
}

export interface LogState {
  byId: {
    [key: number]: Log
  },
  allIds: number[],
}