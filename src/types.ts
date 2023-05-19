export interface player {
  name: string,
  score: number,
  bid: number,
}

export interface state {
  activePlayer: {
    players: player[],
  }
}

 