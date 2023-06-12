import { NavigationProp } from "@react-navigation/native";

export interface Player {
  name: string,
  active: boolean,
  score: number,
  bid: number,
  team: 0|1|2|3|4|5|6|7|8|9,
  place: number,
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
    confirmFunc: string,
    confirmArgs?: any[],
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
 