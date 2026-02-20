export const triggerAgent = async (repoUrl, teamName, leaderName) => {

  try {
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

    console.log("Response Status:", response.status);
    const data = await response.json();
    console.log("Response Data:", data);

    if (!response.ok) {
      throw new Error(data.message || data.error || `Server Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("API Error Details:", error);
    throw error;
  }
};