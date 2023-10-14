// FIX BUG WHERE YOU CAN CLICK ON A FACEUP CARD AND IT ACCEPTS
// IT AS A CARD

import classNames from "classnames";
import Card from "./Card";
import { HARD_MODE } from "./App";

export default function Gameboard({ gameList, isLoaded, noClickEvents, stateProps, mode}) {
    const classList = classNames('gameboard', {
        'displayNone': !isLoaded,
        'noClick': noClickEvents,
        'hardModeMaxWidth': mode == HARD_MODE 
    });

    return <div className={classList}>
    {gameList.map(pokemon => 
        <Card 
            key={pokemon.id} 
            name={pokemon.name} 
            imgUrl={pokemon.imgUrl} 
            disabled={pokemon.disabled}
            visible={pokemon.visible}
            id={pokemon.id}
            {...stateProps}
        />)}
</div>
}