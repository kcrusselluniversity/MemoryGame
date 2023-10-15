import classNames from "classnames";
import { useAtomValue } from "jotai";
import { gameStateAtom } from '../atoms/atoms';

function StartButton({ handleStart }) {
    const gameState = useAtomValue(gameStateAtom);
    const { isGameStarted, isLoaded } = gameState;
    
    const classList = classNames({
        'startButton': isLoaded,
        'visibilityNone': !isLoaded,
        'displayNone': isLoaded && isGameStarted
    })

    return <button className={classList} onClick={handleStart}>Start</button>
}

export default StartButton