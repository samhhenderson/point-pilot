import { NavigationProp } from "@react-navigation/native";

export interface Player {
  name: string,
  active: boolean,
  score: number,
  bid: number,
}

export interface PlayerState {
  playerList: Player[]
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
  }
}

export interface Game {
  gameName: string,
  lowScoreWins: boolean,
  useBid: boolean,
  teams: boolean,
}

export interface GameState {
  activeGame: Game,
  gameList: Game[]
}

export interface State {
  player: PlayerState,
  modals: ModalsState,
  game: GameState,
}

export type NavigationPropType = NavigationProp<
  { Home: undefined, Game: undefined, History: undefined, Settings: undefined }, 
  'Home' | 'Game' | 'History' | 'Settings'
>
 