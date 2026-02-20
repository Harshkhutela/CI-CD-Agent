# API Integration Guide

This document explains how to connect your backend API to the frontend when it's ready.

## Current Setup

The frontend is currently using **mock data** for demonstration. The API service layer is located at:
- **File**: `src/services/api.js`

## How to Integrate Backend API

### Step 1: Update Environment Variables

Create a `.env` file in the `/frontend` folder:

```
REACT_APP_API_URL=http://localhost:3001/api
```

For production, update to your production API URL:

```
REACT_APP_API_URL=https://your-backend-domain.com/api
```

### Step 2: Replace Mock Function in `src/services/api.js`

Currently, the `triggerAgent()` function uses mock data. Replace it with your actual API call:

```javascript
export const triggerAgent = async (repoUrl, teamName, leaderName) => {
  const response = await fetch(`${API_BASE_URL}/agent/run`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      // Add auth headers if needed:
      // "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      repo_url: repoUrl,
      team_name: teamName,
      leader_name: leaderName
    })
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};
```

## Expected Backend Response Format

Your backend should return JSON in this format:

```json
{
  "repo_url": "https://github.com/user/repo",
  "team_name": "TEAM NAME",
  "leader_name": "Leader Name",
  "branch_name": "TEAM_NAME_LEADER_NAME_AI_Fix",
  "failures": 6,
  "fixes_applied": 5,
  "status": "PASSED",
  "time_taken": "3m 20s",
  "time_taken_minutes": 3,
  "commits": 22,
  "retry_limit": 5,
  "fixes": [
    {
      "file": "src/utils.py",
      "bug_type": "LINTING",
      "line": 15,
      "commit": "[AI-AGENT] removed unused import",
      "status": "Fixed"
    }
  ],
  "timeline": [
    {
      "iteration": 1,
      "status": "FAIL",
      "timestamp": "18:01"
    }
  ]
}
```

## Required Fields Explanation

| Field | Type | Description |
|-------|------|-------------|
| `repo_url` | string | The GitHub repository URL analyzed |
| `team_name` | string | Team name (uppercase with underscores) |
| `leader_name` | string | Team leader name |
| `branch_name` | string | Created branch: `TEAM_NAME_LEADER_NAME_AI_Fix` |
| `failures` | number | Total failures found |
| `fixes_applied` | number | Number of fixes applied |
| `status` | string | "PASSED" or "FAILED" |
| `time_taken` | string | Human readable time (e.g., "3m 20s") |
| `time_taken_minutes` | number | Time in minutes (for bonus calculation) |
| `commits` | number | Total commits made (for penalty calculation) |
| `retry_limit` | number | Max retry attempts (default: 5) |
| `fixes` | array | Array of fix objects |
| `timeline` | array | Array of CI/CD iteration results |

## Bug Types Supported

Backend should return these bug types in fixes array:
- `LINTING`
- `SYNTAX`
- `LOGIC`
- `TYPE_ERROR`
- `IMPORT`
- `INDENTATION`

## Timeline Format

Each timeline entry should have:
- `iteration`: number (1, 2, 3...)
- `status`: "PASS" or "FAIL"
- `timestamp`: time string (e.g., "18:01")

## Error Handling

If your API fails, the frontend will catch it and display an error message. Add proper error messages:

```javascript
export const triggerAgent = async (repoUrl, teamName, leaderName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/agent/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repo_url: repoUrl, team_name: teamName, leader_name: leaderName })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to analyze repository");
    }

    return response.json();
  } catch (error) {
    console.error("Agent error:", error);
    throw error;
  }
};
```

## Testing Your Integration

1. Start your backend server on `http://localhost:3001`
2. Update `REACT_APP_API_URL` in `.env`
3. Replace the mock function in `api.js`
4. Run `npm run dev` in the frontend folder
5. Submit the form and check network tab in browser DevTools

## CORS Configuration

If your backend is on a different domain/port, enable CORS:

```javascript
// Backend example (Node.js/Express)
app.use(cors({
  origin: "http://localhost:5173", // Vite default port
  methods: ["POST", "GET"],
  credentials: true
}));
```

## Frontend Data Flow

1. User fills form → `RunAgentForm` component
2. Form submits → calls `triggerAgent()` from `api.js`
3. Response received → passed to `setResult()` state
4. Components render with data:
   - `SummaryCard` - displays repo/team info
   - `ScorePanel` - calculates and shows score
   - `FixesTable` - displays all fixes with color coding
   - `Timeline` - shows CI/CD iterations

## Loading States

The frontend automatically shows:
- Loading spinner while agent is running
- Error message if API call fails
- Results displayed once completed

## Need Help?

Check the mock data structure in `src/services/mockData.js` for reference on expected data format.
