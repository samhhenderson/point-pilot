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
  lowScoreWins: boolean,
  useBid: boolean,
  teams: boolean,
}

export interface GameState {
  activeGame: Game,
  gameList: Game[]
}

export interface Session {
  id: number,
  date: string,
  game_id: number,
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
  session: SessionState,
}

export type NavigationPropType = NavigationProp<
  { Home: undefined, Game: undefined, History: undefined, Settings: undefined }, 
  'Home' | 'Game' | 'History' | 'Settings'
>
 