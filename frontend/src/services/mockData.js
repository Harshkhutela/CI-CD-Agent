export const mockResult = {
  repo_url: "https://github.com/sample/project",
  team_name: "CODE WARRIORS",
  leader_name: "JOHN DOE",
  branch_name: "CODE_WARRIORS_JOHN_DOE_AI_Fix",
  failures: 6,
  fixes_applied: 5,
  status: "PASSED",
  time_taken: "3m 20s",
  time_taken_minutes: 3,
  commits: 22,

  retry_limit: 5,

  fixes: [
    {
      file: "src/utils.py",
      bug_type: "LINTING",
      line: 15,
      commit: "[AI-AGENT] removed unused import",
      status: "Fixed"
    },
    {
      file: "src/validator.py",
      bug_type: "SYNTAX",
      line: 8,
      commit: "[AI-AGENT] added missing colon",
      status: "Fixed"
    },
    {
      file: "src/main.py",
      bug_type: "IMPORT",
      line: 3,
      commit: "[AI-AGENT] fixed import path",
      status: "Failed"
    }
  ],

  timeline: [
    {
      iteration: 1,
      status: "FAIL",
      timestamp: "18:01"
    },
    {
      iteration: 2,
      status: "FAIL",
      timestamp: "18:03"
    },
    {
      iteration: 3,
      status: "PASS",
      timestamp: "18:05"
    }
  ]
};