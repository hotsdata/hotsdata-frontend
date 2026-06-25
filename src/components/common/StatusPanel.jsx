export default function StatusPanel({
  title,
  message,
  tone = "neutral",
  action,
}) {
  return (
    <section
      className={`status-panel ${tone}`}
      role={tone === "error" ? "alert" : "status"}
    >
      <h2>{title}</h2>
      {message ? <p>{message}</p> : null}
      {action ? <div className="status-action">{action}</div> : null}
    </section>
  );
}
