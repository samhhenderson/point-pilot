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
}

export interface Game {
  gameName: string,
  lowScoreWins: boolean,
  useBid: boolean,
  teams: number
}

export interface GameState {
  gameDisplay: Game,
  games: Game[]
}

export interface State {
  playerDisplay: PlayerState,
  modals: ModalsState,
  game: GameState,
}

 