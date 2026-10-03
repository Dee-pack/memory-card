export default function Scoreboard({ score, best }) {
  return (
    <div className="scoreboard">
      <span className="pill">Score <strong>{score}</strong></span>
      <span className="pill best">Best <strong>{best}</strong></span>
    </div>
  );
}