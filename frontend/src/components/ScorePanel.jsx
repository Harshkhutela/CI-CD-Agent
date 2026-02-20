function ScorePanel({ result }) {
  if (!result) return null;

  let baseScore = 100;
  let bonus = 0;
  let penalty = 0;

  if (result.time_taken_minutes < 5) {
    bonus = 10;
  }

  if (result.commits > 20) {
    penalty = (result.commits - 20) * 2;
  }

  const finalScore = baseScore + bonus - penalty;

  return (
    <div className="card">
      <h2 className="card-title">🏆 Score Breakdown</h2>
      
      <div className="score-container">
        <div className="score-circle-wrapper">
          <div className="score-circle">
            <div className="score-circle-inner">
              <div className="score-number">{finalScore}</div>
              <div className="score-label">POINTS</div>
            </div>
          </div>
        </div>

        <div className="score-breakdown">
          <div className="score-breakdown-item">
            <span className="score-item-label">Base Score</span>
            <span className="score-item-value">+{baseScore}</span>
          </div>

          {bonus > 0 && (
            <div className="score-breakdown-item bonus">
              <span className="score-item-label">Speed Bonus (less than 5 min)</span>
              <span className="score-item-value">+{bonus}</span>
            </div>
          )}

          {penalty > 0 && (
            <div className="score-breakdown-item penalty">
              <span className="score-item-label">📎 Efficiency Penalty ({result.commits} commits)</span>
              <span className="score-item-value">-{penalty}</span>
            </div>
          )}

          <div style={{
            height: "2px",
            background: "linear-gradient(90deg, rgba(0,255,200,0.2) 0%, transparent 100%)",
            margin: "10px 0"
          }}></div>

          <div style={{
            padding: "15px",
            background: "rgba(0, 255, 150, 0.1)",
            borderRadius: "8px",
            textAlign: "center"
          }}>
            <div className="score-item-label">FINAL SCORE</div>
            <div style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#00ff96",
              marginTop: "5px"
            }}>
              {finalScore}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScorePanel;