import { NavigationProp } from "@react-navigation/native";

export interface Player {
  name: string,
  score: number,
  bid: number,
}

export interface PlayerState {
  players: Player[]
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
}

export interface Game {
  gameName: string,
  lowScoreWins: boolean,
  useBid: boolean,
  teams: number
}

export interface GameState {
  gameDisplay: Game,
  gameList: Game[]
}

export interface State {
  playerDisplay: PlayerState,
  modals: ModalsState,
  game: GameState,
}

export type NavigationPropType = NavigationProp<
  { Home: undefined, Game: undefined, History: undefined, Settings: undefined }, 
  'Home' | 'Game' | 'History' | 'Settings'
>
 