import { NavigationProp } from "@react-navigation/native";

export interface Player {
  id: number
  name: string,
  icon: string,
  active: number,
  score: number,
  bid: number,
  team: 0|1|2|3|4|5|6|7|8|9,
  place: number,
}

export interface PlayerState {
  byId: {
    [key: string]: Player
  },
  allIds: number[],
}

export interface ModalsState {
  number: {
    vis: boolean,
    playerName: string,
    isBid: boolean
  }
  newGame: {
    vis: boolean,
  }
  confirm: {
    vis: boolean,
    message: string,
    confirmFunc: string,
    confirmArgs?: any[],
  }
}

export interface Game {
  id: number,
  name: string,
  lowScoreWins: 0 | 1,
  useBid: 0 | 1,
  teams: 0 | 1,
  display: 0 | 1,
}

export interface GameState {
  activeGame: Game,
  byId: {
    [key: number]: Game
  },
  allIds: number[],
}

export interface Session {
  id: number,
  date: string,
  gameId: number,
  complete: 0 | 1,
}

export interface SessionState {
  byId: {
    [key: number]: Session
  },
  allIds: number[],
}

export interface State {
  player: PlayerState,
  modals: ModalsState,
  game: GameState,
}

export type NavigationPropType = NavigationProp<
  { Home: undefined, Session: undefined, History: undefined, Settings: undefined }, 
  'Home' | 'Session' | 'History' | 'Settings'
>
 