export const triggerAgent = async (repoUrl, teamName, leaderName) => {

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/run-agent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        repo_url: repoUrl,
        team_name: teamName,
        leader_name: leaderName
      })
    }
  );

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
};