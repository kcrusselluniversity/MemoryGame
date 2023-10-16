// TODO: USE FLIP-HORIZONTALLY PROP of TILT to have a nice animation
// when the card flips over
// TODO: Add the back of the card as an image in the assets and use that
// for the facedown visible side
import Tilt from "react-parallax-tilt";
import cardBack from "../resources/card_back_med.png";
import { useAtom } from "jotai";
import { gameStateAtom } from "../atoms/atoms";

export default function Card({
    pokemon,
    activeCardIdsState,
    loadedImageCountRef,
}) {
    const [gameState, setGameState] = useAtom(gameStateAtom);
    const { name, imgUrl, disabled, visible, id } = pokemon;
    const { activeCardIds, setActiveCardIds } = activeCardIdsState;
    const { mode } = gameState;
    const totalImagesToLoad = mode * 2;

    function handleClick() {
        if (disabled) return;

        // Update active Cards
        setActiveCardIds([...activeCardIds, id]);
    }

    const handleOnLoad = () => {
        loadedImageCountRef.current += 1;
        if (loadedImageCountRef.current === totalImagesToLoad) {
            setGameState({ ...gameState, isLoaded: true });
        }
    };

    const tiltProps = {
        tiltEnable: !disabled,
        transitionSpeed: 600,
        perspective: 1000,
        scale: 1.02,
        tiltMaxAngleX: 0,
        tiltMaxAngleY: 40,
        style: { position: "relative" },
    };

    return (
        <Tilt {...tiltProps}>
            <div className="card" onClick={handleClick}>
                {!visible && <img className="card--back" src={cardBack} />}
                <div className={visible ? "card-faceup" : "hidden"}>
                    <h3>{name}</h3>
                    <img
                        className="card-faceup--image"
                        onLoad={handleOnLoad}
                        src={imgUrl}
                    />
                </div>
            </div>
        </Tilt>
    );
}
