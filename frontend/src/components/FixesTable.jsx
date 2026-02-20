function FixesTable({ result }) {
  if (!result || !result.fixes) return null;

  const getBugTypeClass = (bugType) => {
    return `bug-${bugType.toLowerCase()}`;
  };

  return (
    <div className="card">
      <h2 className="card-title">🔧 Fixes Applied</h2>

      <div className="fixes-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>File</th>
              <th>Bug Type</th>
              <th>Line Number</th>
              <th>Commit Message</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {result.fixes.map((fix, index) => (
              <tr key={index}>
                <td>
                  <code style={{ 
                    background: "rgba(0,255,200,0.1)", 
                    padding: "4px 8px",
                    borderRadius: "4px"
                  }}>
                    {fix.file}
                  </code>
                </td>
                <td>
                  <span className={`bug-type ${getBugTypeClass(fix.bug_type)}`}>
                    {fix.bug_type}
                  </span>
                </td>
                <td>
                  <strong>{fix.line}</strong>
                </td>
                <td>
                  <code style={{ 
                    color: "#888",
                    fontSize: "0.9rem"
                  }}>
                    {fix.commit}
                  </code>
                </td>
                <td>
                  <span className={`status-${fix.status.toLowerCase()}`}>
                    {fix.status === "Fixed" ? "✓ Fixed" : "✗ Failed"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: "20px",
        padding: "15px",
        background: "rgba(0, 255, 200, 0.05)",
        borderRadius: "8px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "15px",
        textAlign: "center"
      }}>
        <div>
          <div style={{ color: "#888", fontSize: "0.9rem" }}>Total Issues</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "700", color: "#00ffb4" }}>
            {result.fixes.length}
          </div>
        </div>
        <div>
          <div style={{ color: "#888", fontSize: "0.9rem" }}>Fixed</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "700", color: "#00ff96" }}>
            {result.fixes.filter(f => f.status === "Fixed").length}
          </div>
        </div>
        <div>
          <div style={{ color: "#888", fontSize: "0.9rem" }}>Failed</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "700", color: "#ff3232" }}>
            {result.fixes.filter(f => f.status === "Failed").length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FixesTable;