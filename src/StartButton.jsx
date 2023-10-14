import classNames from "classnames";

export default function StartButton(props) {
    const {isLoaded, isGameStarted, handleStart} = props;

    const classList = classNames({
        'startButton': isLoaded,
        'visibilityNone': !isLoaded,
        'displayNone': isLoaded && isGameStarted
    })

    return <button className={classList} onClick={handleStart}>Start</button>
}