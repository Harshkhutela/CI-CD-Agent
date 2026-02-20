# 🚀 Backend Integration: Quick Reference

## ⚡ 30-Second Integration Guide

### Step 1: Environment Setup (5 seconds)
Create `.env.local` in `/frontend`:
```
VITE_API_URL=http://localhost:3001/api
```

### Step 2: Update API Layer (25 seconds)
Edit `src/services/api.js`:

**FIND:** (Lines 8-30)
```javascript
export const triggerAgent = async (repoUrl, teamName, leaderName) => {
  // TODO: Replace with real API call
  // const response = await fetch(`${API_BASE_URL}/agent/run`, { ... });
  
  // Simulated API call with delay...
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        repo_url: repoUrl,
        // ... mock data
      });
    }, 2000);
  });
};
```

**REPLACE WITH:**
```javascript
export const triggerAgent = async (repoUrl, teamName, leaderName) => {
  const response = await fetch(`${API_BASE_URL}/agent/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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

### Step 3: Test It! ✅
```bash
cd frontend
npm run dev
# Visit http://localhost:5174
# Fill form and click "Run Agent"
# Check browser console for any errors
```

---

## 📊 Backend API Specification

### Endpoint
```
POST /api/agent/run
```

### Request Body
```json
{
  "repo_url": "https://github.com/owner/repo",
  "team_name": "TEAM NAME",
  "leader_name": "Leader Name"
}
```

### Response Format (MUST match exactly)
```json
{
  "repo_url": "https://github.com/owner/repo",
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
    },
    {
      "file": "src/validator.py",
      "bug_type": "SYNTAX",
      "line": 8,
      "commit": "[AI-AGENT] added missing colon",
      "status": "Fixed"
    }
  ],
  "timeline": [
    {
      "iteration": 1,
      "status": "FAIL",
      "timestamp": "18:01"
    },
    {
      "iteration": 2,
      "status": "FAIL",
      "timestamp": "18:03"
    },
    {
      "iteration": 3,
      "status": "PASS",
      "timestamp": "18:05"
    }
  ]
}
```

---

## 🎨 Bug Types (Color Coded on Frontend)

| Bug Type | Color | Hex Code |
|----------|-------|----------|
| LINTING | Orange | #ffb366 |
| SYNTAX | Red | #ff3232 |
| LOGIC | Blue | #6496ff |
| TYPE_ERROR | Purple | #c864ff |
| IMPORT | Light Blue | #9696ff |
| INDENTATION | Pink | #ff6496 |

---

## 📋 Field Requirements

### Required Fields
```javascript
{
  "repo_url": "", // string - the GitHub URL analyzed
  "team_name": "", // string - team name (UPPERCASE with underscores)
  "leader_name": "", // string - team leader
  "branch_name": "", // string - TEAM_NAME_LEADER_NAME_AI_Fix format
  "failures": 0, // number - total bugs found
  "fixes_applied": 0, // number - total fixes made
  "status": "PASSED", // or "FAILED"
  "time_taken": "", // string - human readable (e.g., "3m 20s")
  "time_taken_minutes": 0, // number - for bonus calculation
  "commits": 0, // number - total commits made (for penalty)
  "retry_limit": 5, // number - max retries allowed
  "fixes": [], // array - each fix object
  "timeline": [] // array - each iteration
}
```

### Fix Object Required Fields
```javascript
{
  "file": "", // string - file path
  "bug_type": "", // LINTING|SYNTAX|LOGIC|TYPE_ERROR|IMPORT|INDENTATION
  "line": 0, // number - line number of bug
  "commit": "", // string - what was fixed
  "status": "Fixed" // "Fixed" or "Failed"
}
```

### Timeline Object Required Fields
```javascript
{
  "iteration": 1, // number - iteration number
  "status": "PASS", // "PASS" or "FAIL"
  "timestamp": "18:01" // string - HH:MM format
}
```

---

## ✅ Checklist Before Going Live

- [ ] Backend returns exact response format
- [ ] All required fields are present
- [ ] Branch name follows format: `TEAM_NAME_LEADER_NAME_AI_Fix`
- [ ] Bug types are from the list (LINTING, SYNTAX, LOGIC, TYPE_ERROR, IMPORT, INDENTATION)
- [ ] Status is "PASSED" or "FAILED" (case-sensitive)
- [ ] time_taken_minutes is a number (for score calculation)
- [ ] commits count is accurate (for penalty calculation)
- [ ] CORS headers enabled on backend
- [ ] `.env.local` configured with API URL
- [ ] Test with sample data before deployment

---

## 🐛 Debugging Tips

### Check Network Request
1. Open DevTools (F12)
2. Go to Network tab
3. Fill form and submit
4. Look for POST request to `/api/agent/run`
5. Check Response tab for data

### Common Issues

**Error: "Failed to analyze repository"**
- Backend not running
- Wrong URL in `.env.local`
- CORS not enabled on backend

**Error: 404**
- Check endpoint URL
- Verify backend is listening on correct port

**Error: Invalid response format**
- Check response has all required fields
- Check field data types match
- Verify JSON is valid

---

## 🎯 What Happens Next

1. Form submitted → `RunAgentForm.jsx` validates input
2. API call → `src/services/api.js` → `POST /api/agent/run`
3. Loading state → Shows spinner overlay
4. Response received → Data passed to components
5. Components render:
   - `SummaryCard` - shows repo/team info
   - `ScorePanel` - calculates score (100 + bonus - penalty)
   - `FixesTable` - displays all fixes with colors
   - `Timeline` - shows iterations

---

## 💾 Code Locations

- **API Layer**: `src/services/api.js` ← **EDIT HERE**
- **Mock Data**: `src/services/mockData.js` (reference)
- **Environment**: `.env.local` (create in frontend root)
- **Form Component**: `src/components/RunAgentForm.jsx`
- **Main Page**: `src/pages/Dashboard.jsx`

---

## 🚀 Frontend Entry Point

**File**: `src/pages/Dashboard.jsx`

Flow:
1. User enters data in form
2. Form validation runs
3. `triggerAgent()` called from `api.js`
4. Loading overlay shown
5. Response received
6. Components display data

---

**That's it! Your backend just needs to return the specified JSON format!**
