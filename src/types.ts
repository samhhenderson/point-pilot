export interface player {
  name: string,
  score: number,
}

export interface state {
  player: {
    players: player[],
  }
}

 