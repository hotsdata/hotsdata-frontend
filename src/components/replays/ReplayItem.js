import React from 'react';
import { Link } from 'react-router';

function str_pad_left(string,pad,length) {
  return (new Array(length+1).join(pad)+string).slice(-length);
}

function convertSecondsToTime(totalSeconds) {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds - minutes * 60;

  let finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
  return finalTime;
}


const ReplayItem = ({replay}) => {
  return (
    <tr className={_.toLower(replay.matchresult) + "-row"}>
      <td data-th="Hero">{replay.heroname}</td>
      <td data-th="Map">{replay.mapname}</td>
      <td data-th="Game Type">{replay.gametype}</td>
      <td data-th="DateTime">{replay.played_at}</td>
      <td data-th="Duration">{convertSecondsToTime(replay.duration)}</td>
      <td data-th="Result">{replay.matchresult}</td>
      <td data-th="View">
        <Link to={`/replays/${replay.replayid}`} style={{color: "white"}}>
          <i className="fa fa-eye"></i>
        </Link>
      </td>
    </tr>
  )
}

export default ReplayItem;
