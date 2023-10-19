import classNames from "classnames";
import Card from "./Card";
import StartButton from "./StartButton";
import { useRef } from "react";
import { useAtom } from "jotai";
import { gameStateAtom } from "../atoms/atoms";
import { MEDIUM_MODE, HARD_MODE } from "../atoms/atoms";

export default function Gameboard({
    pokemonCardsState,
    activeCardIdsState,
    timerState,
}) {
    const { pokemonCards, setPokemonCards } = pokemonCardsState;
    const { activeCardIds, setActiveCardIds } = activeCardIdsState;
    const { timer, setTimer } = timerState;

    const [gameState, setGameState] = useAtom(gameStateAtom);
    const loadedImageCountRef = useRef(0);

    const classList = classNames("gameboard", {
        displayNone: !gameState.isLoaded,
        medMode: gameState.mode == MEDIUM_MODE,
        hardMode: gameState.mode == HARD_MODE,
    });

    function handleStart() {
        setGameState({
            ...gameState,
            isGameStarted: true,
        });
        setPokemonCards(
            pokemonCards.map((pokemon) => {
                return { ...pokemon, disabled: false };
            })
        );
        setTimer([...timer, new Date()]);
    }

    return (
        <div className={classList}>
            <StartButton handleStart={handleStart} />
            {pokemonCards.map((pokemon) => (
                <Card
                    key={pokemon.id}
                    pokemon={pokemon}
                    activeCardIdsState={{ activeCardIds, setActiveCardIds }}
                    loadedImageCountRef={loadedImageCountRef}
                />
            ))}
        </div>
    );
}
