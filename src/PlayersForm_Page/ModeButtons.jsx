import RadioButton from "./RadioButton";

import { EASY_MODE, MEDIUM_MODE, HARD_MODE } from "../atoms/atoms";

export default function ModeButtons() {
    return (
        <div className="modeButtonsContainer">
            <RadioButton label="Easy" value={EASY_MODE} />
            <RadioButton label="Medium" value={MEDIUM_MODE} />
            <RadioButton label="Hard" value={HARD_MODE} />
        </div>
    );
}
