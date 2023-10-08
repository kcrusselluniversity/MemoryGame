import { useState, useRef, useEffect } from "react"

export default function Card({ name, imgUrl, disabled, firstCard, setFirstCard, secondCard, setSecondCard, gameList, setGameList, lastCardClickedRef }) {
    const [visible, setVisible] = useState(false)

    function handleClick(event) { 
        console.log(lastCardClickedRef.current)
        setVisible(visible => !visible) 
        
        if (secondCard) {
            // Compare the two cards
            if (firstCard === name) {
                // disable the pair of cards
                const newList = [...gameList].map(pokemon => {
                    if(pokemon.name === name) { pokemon.disabled = true }
                    return pokemon
                })
                setGameList(newList)
            } else {
                // setVisible(false)
                // lastCardClickedRef.current.class = "hidden";
            }
            setSecondCard(false)
        }
        
        setFirstCard(name)
        setSecondCard(true);
        lastCardClickedRef.current = event.target; 
    }

    return (
        <div className="card" onClick={disabled ? null : handleClick}>
            <div className={visible ? null : 'hidden'}>
                <h3 style={{margin: '0px', paddingBottom: '6px', color: 'black'}}>{name}</h3>
                <img src={imgUrl} style={{height: '150px', width: '150px'}}/>
            </div>
        </div>
    )
}