export default function HighScoreDisplay({ highScore }) {
    if (highScore.time === null) return null

    return <h2> Best Time: {highScore.time} seconds ({highScore.player})</h2>
}