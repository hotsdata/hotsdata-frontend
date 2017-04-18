import _ from 'lodash';

class MatchSummaryDataTransformer {
  constructor(data) {
    this.originalData = data;
  }

  transform() {
    let data = {
      replayId: this.originalData.replayid,
      mapName: this.originalData.replay_data.mapName,
      stats: this.getStats(this.originalData)
    }

    return data;
  }

  getStats(data) {
    let stats = data.account_info.map((account) => {
      return {
        player: account.name,
        hero: account.hero,
        heroLevel: account.heroLevel,
        team: account.team,
        playerId: account.playerId
      }
    });

    stats.forEach((stat) => {
      let general_stats = _.find(data.player_general_stats, (pgs) => pgs.playerId == stat.playerId)
      let player_stats = {
        kills: general_stats.soloKills
      }
      console.log('player_stats', player_stats);
    });

    return stats;
  }

}

export default MatchSummaryDataTransformer;
