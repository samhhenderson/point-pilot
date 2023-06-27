import { useSelector } from "react-redux";
import { State } from "../types";

type PlayerSessionIdPlace = {
  playerSessionId: number,
  place: number,
}

export function useCalculatePlaces() {
  return function calculatePlaces (sessionId: number):PlayerSessionIdPlace[] { 
    const playerSessionIds = useSelector((state: State) => {
      return state.playerSession.allIds.filter(id => {
        return state.playerSession.byId[id].sessionId === sessionId
      })
    });
    console.log('HELPERFUNCTIONS 16', playerSessionIds)

    const playerSessions = useSelector((state: State) => {
      return playerSessionIds.map((id: number) => state.playerSession.byId[id]);
    });

    const lowScoreWins = useSelector((state: State) => {
      return state.game.byId[state.session.byId[sessionId]
      .gameId].lowScoreWins;
    })

    const sortedPlayerSessions = [...playerSessions].sort((a, b) => {
      if (lowScoreWins) return a.score - b.score;
      else return b.score - a.score;
    });
    const places: PlayerSessionIdPlace[] = [];
    let currentPlace = 1;
    sortedPlayerSessions.forEach((ps, i) => {
      if (i === 0 || ps.score === sortedPlayerSessions[i - 1].score) {
        places.push({playerSessionId: ps.id, place: currentPlace})
      } else {
        currentPlace++;
        places.push({playerSessionId: ps.id, place: currentPlace})
      }
    })
    return places;
  }
}

export function calculatePlaces(playerSession)
