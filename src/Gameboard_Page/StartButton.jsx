import classNames from "classnames";

function StartButton({ handleStart, gameState: {isGameStarted, isLoaded }}) {
    const classList = classNames({
        'startButton': isLoaded,
        'visibilityNone': !isLoaded,
        'displayNone': isLoaded && isGameStarted
    })

    return <button className={classList} onClick={handleStart}>Start</button>
}

export default StartButton