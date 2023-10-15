import { atom } from "jotai"

export const EASY_MODE = 4;
export const MEDIUM_MODE = 6;
export const HARD_MODE = 9;

export const gameStateAtom = atom({
    mode: EASY_MODE,
    player1: null,
    player2: null,
    currentPlayer: null,
    playersEntered: false,
    isGameStarted: false,
    isLoaded: false,
    gameOver: false,
    restartGame: false,
  })