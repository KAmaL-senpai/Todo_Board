// LogsTable.jsx

const LogsTable = ({ logs }) => {
  if (logs.length === 0) return <p>No logs found.</p>;

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>User</th>
          <th>Email</th>
          <th>Action</th>
          <th>Task</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log._id}>
            <td>{log.user?.username || "Unknown"}</td>
            <td>{log.user?.email || "N/A"}</td>
            <td>{log.action}</td>
            <td>{log.task?.title || "Deleted Task"}</td>
            <td>{new Date(log.timestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LogsTable;
