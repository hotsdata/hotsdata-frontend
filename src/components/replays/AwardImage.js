import React from 'react';

let base_url = "https://s3-us-west-2.amazonaws.com/hotsdata-assets/images/awards/";

const awards = {
  EndOfMatchAward0Deaths: {
    name: "Sole Survivor", imgUrl: "SoleSurvivor.png"
  },
  EndOfMatchAward0OutnumberedDeaths: {
    name: "Team Player", imgUrl: "TeamPlayer.png"
  },
  EndOfMatchAwardClutchHealer: {
    name: "Clutch Healer", imgUrl: "ClutchHealer.png"
  },
  EndOfMatchAwardGivenToNonwinner: { },
  EndOfMatchAwardHatTrick: {
    name: "Hat Trick", imgUrl: "HatTrick.png"
  },
  EndOfMatchAwardHighestKillStreak: {
    name: "Dominator", imgUrl: "Dominator.png"
  },
  EndOfMatchAwardMVP: {
    name: "MVP", imgUrl: "MVP.png"
  },
  EndOfMatchAwardMapSpecific: { },
  EndOfMatchAwardMostAltarDamageDone: {
    name: "Cannoneer", imgUrl: "Cannoneer.png"
  },
  EndOfMatchAwardMostCoinsPaid: {
    name: "Moneybags", imgUrl: "Moneybags.png"
  },
  EndOfMatchAwardMostCurseDamageDone: {
    name: "Master of the Curse", imgUrl: "MasteroftheCurse.png"
  },
  EndOfMatchAwardMostDamageDoneToZerg: {
    name: "Zerg Crusher", imgUrl: "ZergCrusher.png"
  },
  EndOfMatchAwardMostDamageTaken: {
    name: "Bulwark", imgUrl: "Bulwark.png"
  },
  EndOfMatchAwardMostDamageToMinions: {
    name: "Guaridan Slayer", imgUrl: "GuardianSlayer.png"
  },
  EndOfMatchAwardMostDamageToPlants: {
    name: "Garden Teror", imgUrl: "GardenTerror.png"
  },
  EndOfMatchAwardMostDaredevilEscapes: {
    name: "Escape Artist", imgUrl: "EscapeArtist.png"
  },
  EndOfMatchAwardMostDragonShrinesCaptured: {
    name: "Shriner", imgUrl: "Shriner.png"
  },
  EndOfMatchAwardMostEscapes: {
    name: "Escape Artist", imgUrl: "EscapeArtist.png"
  },
  EndOfMatchAwardMostGemsTurnedIn: {
    name: "Jeweler", imgUrl: "Jeweler.png"
  },
  EndOfMatchAwardMostHealing: {
    name: "Main Healer", imgUrl: "Healing.png"
  },
  EndOfMatchAwardMostHeroDamageDone: {
    name: "Painbringer", imgUrl: "Painbringer.png"
  },
  EndOfMatchAwardMostImmortalDamage: {
    name: "Immortal Slayer", imgUrl: "ImmortalSlayer.png"
  },
  EndOfMatchAwardMostKills: {
    name: "Finisher", imgUrl: "Finisher.png"
  },
  EndOfMatchAwardMostMercCampsCaptured: {
    name: "Headhunter", imgUrl: "Headhunter.png"
  },
  EndOfMatchAwardMostNukeDamageDone: {
    name: "DaBomb", imgUrl: "DaBomb.png"
  },
  EndOfMatchAwardMostProtection: {
    name: "Protector", imgUrl: "Protector.png"
  },
  EndOfMatchAwardMostRoots: {
    name: "Trapper", imgUrl: "Trapper.png"
  },
  EndOfMatchAwardMostSiegeDamageDone: {
    name: "Siege Master", imgUrl: "SiegeMaster.png"
  },
  EndOfMatchAwardMostSilences: {
    name: "Silencer", imgUrl: "Silencer.png"
  },
  EndOfMatchAwardMostSkullsCollected: {
    name: "Skull Collector", imgUrl: "Moneybags.png"
  },
  EndOfMatchAwardMostStuns: {
    name: "Stunner", imgUrl: "Stunner.png"
  },
  EndOfMatchAwardMostTeamfightDamageTaken: {
    name: "Guardian", imgUrl: "Guardian.png"
  },
  EndOfMatchAwardMostTeamfightHealingDone: {
    name: "Combat Medic", imgUrl: "CombatMedic.png"
  },
  EndOfMatchAwardMostTeamfightHeroDamageDone: {
    name: "Scrapper", imgUrl: "Scrapper.png"
  },
  EndOfMatchAwardMostTimeInTemple: {
    name: "Temple Master", imgUrl: "TempleMaster.png"
  },
  EndOfMatchAwardMostTimePushing: {
    name: "Pusher", imgUrl: "Pusher.png"
  },
  EndOfMatchAwardMostVengeancesPerformed: {
    name: "Avenger", imgUrl: "Avenger.png"
  },
  EndOfMatchAwardMostXPContribution: {
    name: "Experienced", imgUrl: "Experienced.png"
  }
}

const AwardImage = ({award}) => {
  if (!award) { return (<span></span>) }

  let awardData = awards[award.award];

  if (!awardData) {
    console.log('missing award', award);
    return (<span>award.award</span>);
  }

  return (
    <img className="award" src={`${base_url}${awardData.imgUrl}`} title={awardData.name} />
  )
}

export default AwardImage;
