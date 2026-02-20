import RunAgentForm from "../components/RunAgentForm";
import SummaryCard from "../components/SummaryCard";
import { useState } from "react";
import ScorePanel from "../components/ScorePanel";
import FixesTable from "../components/FixesTable";
import Timeline from "../components/Timeline";


function Dashboard() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAgentRun = (agentResult) => {
    setResult(agentResult);
    setLoading(false);
    setError(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setLoading(false);
  };

  return (
    <div className="dashboard">
      {loading && (
        <div className="loading-overlay">
          <div style={{ textAlign: "center" }}>
            <div className="loading-spinner"></div>
            <div className="loading-text">Analyzing Repository...</div>
          </div>
        </div>
      )}

      <div className="dashboard-header">
        <h1>⚡ Autonomous DevOps Agent</h1>
        <p>Intelligent CI/CD Pipeline Analyzer & Fixer</p>
      </div>

      {error && <div className="error-message">❌ {error}</div>}

      <RunAgentForm 
        setResult={handleAgentRun} 
        setLoading={setLoading}
        setError={handleError}
      />

      {result && (
        <>
          <SummaryCard result={result} />
          <ScorePanel result={result} />
          <FixesTable result={result} />
          <Timeline result={result} />
        </>
      )}
    </div>
  );
}

export default Dashboard;