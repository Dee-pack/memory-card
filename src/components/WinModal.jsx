export default function WinModal({ score, onPlayAgain }) {
  return (
    <div className="overlay">
      <div className="modal" role="dialog" aria-modal="true">
        <h2>You win!</h2>
        <p>You picked all {score} characters without a repeat.</p>
        <button className="play-again" onClick={onPlayAgain}>
          Play again
        </button>
      </div>
    </div>
  );
}