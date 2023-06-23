import { NavigationProp, RouteProp } from "@react-navigation/native";

//PLAYER
export interface Player {
  id: number
  name: string,
  icon: string,
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

export interface State {
  player: PlayerState,
  modals: ModalsState,
  game: GameState,
  session: SessionState,
  playerSession: PlayerSessionState,
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

