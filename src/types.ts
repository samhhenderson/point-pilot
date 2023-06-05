export interface Player {
  name: string,
  score: number,
  bid: number,
}

export interface ModalsState{
  number: {
    vis: boolean,
    player: string,
    bid: boolean
  }
}

export interface PlayerState{
  players: Player[]
}

export interface State {
  playerDisplay: PlayerState,
  modals: ModalsState
}

 