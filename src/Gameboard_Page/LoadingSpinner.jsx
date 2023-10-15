import { useAtomValue } from 'jotai';
import { gameStateAtom } from '../atoms/atoms';

export default function LoadingSpinner(){
    const gameState = useAtomValue(gameStateAtom);
    const { isLoaded } = gameState;

    return <div 
    className={isLoaded ? "displayNone" : "spinnerContainer"}>
        <div className="loadingSpinner"></div>
    </div>
}