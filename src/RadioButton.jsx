export default function RadioButton({ label, value }) {
    return (
        <div className="modeButton">
            <input
                type="radio"
                name="mode"
                id={label}
                value={value}
            />
            <label htmlFor={label}>{label}</label>
        </div>
    );
}
