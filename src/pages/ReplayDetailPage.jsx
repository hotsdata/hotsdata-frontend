import { Shield, Swords } from "lucide-react";
import { useParams } from "react-router";

import StatusPanel from "../components/common/StatusPanel.jsx";
import StatCard from "../components/common/StatCard.jsx";
import DataTable from "../components/data/DataTable.jsx";
import Tabs from "../components/data/Tabs.jsx";
import { useGetReplayQuery } from "../features/hotsdata/hotsdataApi.js";
import { secondsToTimeString } from "../lib/TimeUtils.js";

function getPlayers(replay) {
  return (
    replay?.player_stats?.map((stats) => {
      const account = replay.account_info?.[stats.playerId] || {};
      return {
        id: account.playerId || stats.playerId,
        name: account.name,
        hero: stats.heroName,
        team: account.team === 0 ? "Blue" : "Red",
        result: account.gameResult === 1 ? "Victory" : "Defeat",
        takedowns: stats.Takedowns,
        deaths: stats.Deaths,
        heroDamage: stats.HeroDamage,
        siegeDamage: stats.SiegeDamage,
        xp: stats.ExperienceContribution,
      };
    }) || []
  );
}

export default function ReplayDetailPage() {
  const { replayId } = useParams();
  const { data: replay, error, isFetching } = useGetReplayQuery(replayId);

  if (isFetching && !replay) {
    return (
      <StatusPanel
        title="Loading replay"
        message="Fetching match summary and stat tables."
      />
    );
  }

  if (error || !replay) {
    return (
      <StatusPanel
        tone="error"
        title="Replay unavailable"
        message={error?.message || "The replay could not be loaded."}
      />
    );
  }

  const team1 = replay.teams_stats?.[0] || {};
  const team2 = replay.teams_stats?.[1] || {};
  const playerRows = getPlayers(replay);
  const playerColumns = [
    { key: "name", label: "Player" },
    { key: "hero", label: "Hero" },
    { key: "team", label: "Team" },
    { key: "result", label: "Result" },
    { key: "takedowns", label: "Takedowns", numeric: true },
    { key: "deaths", label: "Deaths", numeric: true },
    {
      key: "heroDamage",
      label: "Hero damage",
      numeric: true,
      render: (row) => row.heroDamage.toLocaleString(),
    },
    {
      key: "siegeDamage",
      label: "Siege damage",
      numeric: true,
      render: (row) => row.siegeDamage.toLocaleString(),
    },
    {
      key: "xp",
      label: "XP",
      numeric: true,
      render: (row) => row.xp.toLocaleString(),
    },
  ];

  return (
    <section className="content-section">
      <div className="replay-hero">
        <div className="team-score blue-side">
          <Shield size={22} />
          <span>Blue Team</span>
          <strong>{team1.totalEnemyHeroesTakenDown}</strong>
          <small>Level {team1.level}</small>
        </div>
        <div className="match-title">
          <p className="eyebrow">{replay.replayid}</p>
          <h1>{replay.replay_data.mapName}</h1>
          <span>
            {replay.replay_data.gameType} ·{" "}
            {secondsToTimeString(replay.replay_data.gameLoops / 16)}
          </span>
        </div>
        <div className="team-score red-side">
          <Swords size={22} />
          <span>Red Team</span>
          <strong>{team2.totalEnemyHeroesTakenDown}</strong>
          <small>Level {team2.level}</small>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          label="Winner"
          value={team1.isWinner ? "Blue" : "Red"}
          tone="success"
        />
        <StatCard
          label="Duration"
          value={secondsToTimeString(replay.replay_data.gameLoops / 16)}
        />
        <StatCard label="Players" value={playerRows.length} />
      </div>

      <Tabs
        tabs={[
          {
            id: "stats",
            label: "Stats",
            content: <DataTable columns={playerColumns} rows={playerRows} />,
          },
          {
            id: "talents",
            label: "Talents",
            content: (
              <DataTable
                columns={[
                  { key: "player", label: "Player" },
                  { key: "hero", label: "Hero" },
                  {
                    key: "talents",
                    label: "Talents",
                    render: (row) => row.talents.join(", "),
                  },
                ]}
                rows={replay.talents}
              />
            ),
          },
          {
            id: "teams",
            label: "Team stats",
            content: (
              <DataTable
                columns={[
                  { key: "team", label: "Team" },
                  { key: "level", label: "Level", numeric: true },
                  {
                    key: "totalEnemyHeroesTakenDown",
                    label: "Takedowns",
                    numeric: true,
                  },
                  {
                    key: "isWinner",
                    label: "Result",
                    render: (row) => (row.isWinner ? "Victory" : "Defeat"),
                  },
                ]}
                rows={replay.teams_stats.map((team, index) => ({
                  ...team,
                  id: index,
                  team: index === 0 ? "Blue" : "Red",
                }))}
              />
            ),
          },
        ]}
      />
    </section>
  );
}
