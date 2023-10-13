import { EASY_MODE, MEDIUM_MODE, HARD_MODE } from "./App";

export default function ModeButtons() {

    return (
        <div className="modeButtonsContainer">
            <label htmlFor="EASY_MODE">
                <input type="radio" name="mode" id="EASY_MODE" value={EASY_MODE}/>
                <span className="radio-indicator">Easy</span>
            </label>
            <label htmlFor="MEDIUM_MODE">
                <input type="radio" name="mode" id="MEDIUM_MODE" value={MEDIUM_MODE} />
                <span className="radio-indicator">Medium</span>
            </label>
            <label htmlFor="HARD_MODE">
                <input type="radio" name="mode" id="HARD_MODE" value={HARD_MODE} />
                <span className="radio-indicator">Hard</span>
            </label>
        </div>
    )
}