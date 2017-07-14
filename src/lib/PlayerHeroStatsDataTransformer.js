export function transformPlayerHeroStats(heroStats) {
  let stats = {}
  _.forEach(heroStats, (stat) => {
    stats[stat.metric] = stat.value / stat.games
  });

  return stats;
}
