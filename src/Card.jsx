import { useState } from "react"

export default function Card({ name, imgUrl }) {
    const [visible, setVisible] = useState(false)

    function handleClick() { setVisible(visible => !visible) }

    return (
        <div className="card" onClick={handleClick}>
            <div className={visible ? null : 'hidden'}>
                <h3 style={{margin: '0px', paddingBottom: '6px', color: 'black'}}>{name}</h3>
                <img src={imgUrl} style={{height: '150px', width: '150px'}}/>
            </div>
        </div>
    )
}