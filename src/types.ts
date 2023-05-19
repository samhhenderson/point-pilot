export interface Player {
  name: string,
  score: number,
  bid: number,
}

export interface ViewState{
  numberModalVis: boolean
}

export interface PlayerState{
  players: Player[]
}

export interface State {
  activePlayer: PlayerState,
  view: ViewState
}

 