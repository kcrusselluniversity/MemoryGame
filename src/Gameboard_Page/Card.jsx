// TODO: TIDY UP CARD CLASSNAMES USING THE CLASSNAME LIBRARY
import Tilt from "react-parallax-tilt";
import cardBack from "../assets/card_back_med.png";
import { useAtom } from "jotai";
import { gameStateAtom } from "../atoms/atoms";
import { useState } from "react";
import { cardFlipDuration } from "../constants";

export default function Card({
    pokemon,
    activeCardIdsState,
    loadedImageCountRef,
}) {
    const [gameState, setGameState] = useAtom(gameStateAtom);
    const [isCardFlipped, setIsCardFlipped] = useState(null);
    const { name, imgUrl, disabled, visible, id } = pokemon;
    const { isFlipBackOver } = pokemon;
    const { activeCardIds, setActiveCardIds } = activeCardIdsState;
    const { mode } = gameState;
    const totalImagesToLoad = mode * 2;

    function handleClick() {
        if (disabled) return;

        // Update active Cards
        setActiveCardIds([...activeCardIds, id]);

        // Update Card flip status for animation to occur
        setIsCardFlipped(true);

        setTimeout(() => setIsCardFlipped(false), cardFlipDuration);
    }

    const handleOnLoad = () => {
        loadedImageCountRef.current += 1;
        if (loadedImageCountRef.current === totalImagesToLoad) {
            setGameState({ ...gameState, isLoaded: true });
        }
    };

    const tiltProps = {
        perspective: 1000,
        scale: 1.02,
        tiltMaxAngleX: 0,
        tiltMaxAngleY: 30,
        style: { position: "relative" },
    };

    return (
        <Tilt {...tiltProps}>
            <div
                className={`card ${isCardFlipped && "card--flip"} ${
                    isFlipBackOver && "card--flip--back"
                }`}
                onClick={handleClick}
            >
                {!visible && (
                    <img
                        className={`card--back`}
                        src={cardBack}
                        draggable={false}
                    />
                )}
                <div
                    className={`card-faceup ${
                        !isCardFlipped
                            ? "card-faceup--visible"
                            : "card-faceup--hidden"
                    } `}
                >
                    <h3>{name}</h3>
                    <img
                        className="card-faceup--image"
                        onLoad={handleOnLoad}
                        src={imgUrl}
                        draggable={false}
                    />
                </div>
            </div>
        </Tilt>
    );
}
