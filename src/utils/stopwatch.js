const millisecondsInSeconds = 1000;

export default function stopWatch(finishTime, startTime) {
    const durationInMilliseconds = finishTime - startTime;
    
    const secondsElapsed = durationInMilliseconds/millisecondsInSeconds;

    return Math.round(secondsElapsed * 100)/100
}