import { useState } from "react";
import { triggerAgent } from "../services/api";

function RunAgentForm({ setResult, setLoading, setError }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validateInputs = () => {
    if (!repoUrl.trim()) {
      setError("GitHub Repository URL is required");
      return false;
    }
    if (!repoUrl.includes("github.com")) {
      setError("Please enter a valid GitHub URL");
      return false;
    }
    if (!teamName.trim()) {
      setError("Team Name is required");
      return false;
    }
    if (!leaderName.trim()) {
      setError("Team Leader Name is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    setSubmitted(true);

    try {
      // When backend is ready, replace this with:
      // const response = await fetch("YOUR_BACKEND_API/agent/run", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     repo_url: repoUrl,
      //     team_name: teamName,
      //     leader_name: leaderName
      //   })
      // });
      // const result = await response.json();

      const result = await triggerAgent(repoUrl, teamName, leaderName);
      setResult(result);
    } catch (err) {
      const errorMsg = err.message || "Failed to start agent. Please try again.";
      setError(`❌ ${errorMsg}`);
      setSubmitted(false);
      console.error("Full error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <input
          type="text"
          className="form-input"
          placeholder="https://github.com/username/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          disabled={submitted}
        />

        <input
          type="text"
          className="form-input"
          placeholder="e.g., RIFT ORGANISERS"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          disabled={submitted}
        />

        <input
          type="text"
          className="form-input"
          placeholder="e.g., Saiyam Kumar"
          value={leaderName}
          onChange={(e) => setLeaderName(e.target.value)}
          disabled={submitted}
        />

        <button 
          type="submit" 
          className="btn-run"
          disabled={submitted}
        >
          {submitted ? "Running..." : "Run Agent"}
        </button>
      </div>
    </form>
  );
}

export default RunAgentForm;