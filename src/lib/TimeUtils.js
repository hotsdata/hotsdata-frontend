import moment from 'moment';
import duration from 'moment-duration-format';

export function secondsToTimeString(seconds) {
  let duration = moment.duration(seconds, 'seconds');
  let formatted = duration.format("mm:ss", { trim: false });
  return formatted;
}
