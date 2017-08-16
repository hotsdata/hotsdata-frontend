import { secondsToTimeString } from './TimeUtils';

function findStat(stat_array, metric, default_value=null) {
  return _.find(stat_array, (s) => s.metric == metric) || default_value;
}

function averageStat(stat_array, metric, roundPlaces = 1) {
  let stat = findStat(stat_array, metric, 0);
  return _.round(stat.value / stat.games, roundPlaces);

}

export function transformAllPlayerHerosData(data) {
  if(!data) { return null; }
  let pdata = {
    player: data.player_name,
    player_id: data.player_id,
  };

  pdata.heroes = data.stats.map(hero => {
    return transformPlayerHeroData(hero);
  });

  return pdata;
}

export function transformPlayerHeroData(data) {
  let tdata = {};
  tdata.hero = data.hero;
  tdata.games = _.max(_.map(data.hero_stats,s => s.games));
  tdata.wins = findStat(data.hero_stats, "match_won", 0).value;
  tdata.losses = findStat(data.hero_stats, "match_lost", 0).value;
  tdata.winRate = _.round(tdata.wins / tdata.games * 100, 1);
  tdata.takedowns = averageStat(data.hero_stats, "takedowns");
  tdata.kills = averageStat(data.hero_stats, "solokill");
  tdata.deaths = averageStat(data.hero_stats, "deaths");
  tdata.kda = _.round(tdata.takedowns / tdata.deaths, 1);
  tdata.timeDead = secondsToTimeString(averageStat(data.hero_stats, "timespentdead"));
  tdata.heroDamage = averageStat(data.hero_stats, "herodamage", 0);
  tdata.siegeDamage = averageStat(data.hero_stats, "siegedamage", 0);
  tdata.healing = averageStat(data.hero_stats, "healing", 0);
  tdata.selfHealing = averageStat(data.hero_stats, "selfhealing", 0);
  tdata.damageTaken = averageStat(data.hero_stats, "damagetaken", 0);
  tdata.xp = averageStat(data.hero_stats, "experiencecontribution", 0);

  return tdata;
}
