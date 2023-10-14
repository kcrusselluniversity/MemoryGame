export default function StartButton(props) {
    const {isLoaded, isGameStarted, handleStart} = props;

    const isLoadedClassName = isLoaded ? 'startButton' : 'visibilityNone';
    const isGameStartedClassName = isLoaded && isGameStarted ? 'displayNone' : '';

    return <button 
        className={`${isLoadedClassName} ${isGameStartedClassName}`} 
        onClick={handleStart}>
            Start
        </button>
}