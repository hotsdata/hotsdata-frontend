import { useState } from "react";

export default function Tabs({ tabs }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const activeTab = tabs.find((tab) => tab.id === activeId) || tabs[0];

  return (
    <section className="tabs">
      <div className="tab-list" role="tablist" aria-label="Replay stat views">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeTab.id}
            className={tab.id === activeTab.id ? "active" : ""}
            onClick={() => setActiveId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-panel" role="tabpanel">
        {activeTab.content}
      </div>
    </section>
  );
}
