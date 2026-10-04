export default function Scoreboard({ score, best, lost }) {
  return (
    <div className="scoreboard">
      <span className={`pill ${lost ? "flash" : ""}`}>
        Score <strong>{score}</strong>
      </span>
      <span className="pill best">Best <strong>{best}</strong></span>
    </div>
  );
}