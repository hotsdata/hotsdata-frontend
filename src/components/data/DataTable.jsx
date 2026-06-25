export default function DataTable({
  columns,
  rows,
  emptyMessage = "No rows to show.",
}) {
  if (!rows?.length) {
    return <div className="empty-table">{emptyMessage}</div>;
  }

  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={
                row.id || row.replayid || row.playerId || `${row.name}-${index}`
              }
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={column.numeric ? "numeric" : undefined}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
