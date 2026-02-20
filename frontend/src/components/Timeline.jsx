function Timeline({ result }) {

  if (!result || !result.timeline) return null;

  return (
    <div style={{border:"2px solid purple", padding:"20px", marginTop:"20px"}}>
      <h3>CI/CD Status Timeline</h3>

      {result.timeline.map((run, index) => (
        <div key={index} style={{marginBottom:"10px"}}>
          <p>
            Iteration: {run.iteration} / {result.retry_limit}
          </p>

          <p>
            Status: 
            <span style={{color: run.status === "PASS" ? "green" : "red"}}>
              {" "}{run.status}
            </span>
          </p>

          <p>Timestamp: {run.timestamp}</p>

          <hr />
        </div>
      ))}

    </div>
  );
}

export default Timeline;