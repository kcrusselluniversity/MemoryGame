import classNames from "classnames";

function StartButton({isLoaded, handleStart, gameState: {isGameStarted}}) {
    const classList = classNames({
        'startButton': isLoaded,
        'visibilityNone': !isLoaded,
        'displayNone': isLoaded && isGameStarted
    })

    return <button className={classList} onClick={handleStart}>Start</button>
}

export default StartButton