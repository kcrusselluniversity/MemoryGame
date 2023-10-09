import { shuffle } from "lodash";

// This function generates an array of n random numbers from 1 to maxValue
export default function randomNumberArray(maxValue, n) {
    let numbersArray = Array(maxValue).fill().map((_, index) => index+1)
    numbersArray = shuffle(numbersArray)
    return numbersArray.slice(0, n)
}