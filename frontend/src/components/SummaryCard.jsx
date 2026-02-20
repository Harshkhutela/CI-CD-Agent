function SummaryCard({ result }) {
  if (!result) return null;

  return (
    <div className="card">
      <h2 className="card-title">📋 Run Summary</h2>
      
      <div className="info-row">
        <span className="info-label">Repository URL</span>
        <span className="info-value">{result.repo_url}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Team Name</span>
        <span className="info-value">{result.team_name}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Team Leader</span>
        <span className="info-value">{result.leader_name}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Branch Created</span>
        <span className="info-value" style={{ fontFamily: "monospace", fontSize: "0.95rem" }}>
          {result.branch_name}
        </span>
      </div>

      <div className="info-row">
        <span className="info-label">Total Failures</span>
        <span className="info-value">{result.failures}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Total Fixes Applied</span>
        <span className="info-value">{result.fixes_applied}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Time Taken</span>
        <span className="info-value">{result.time_taken}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Final Status</span>
        <span className={`status-badge ${result.status === "PASSED" ? "status-passed" : "status-failed"}`}>
          {result.status === "PASSED" ? "✅ PASSED" : "❌ FAILED"}
        </span>
      </div>
    </div>
  );
}

export default SummaryCard;