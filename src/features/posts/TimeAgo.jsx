import React from 'react';
import { format, parseISO, formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ timestamp }) => {
  let timeAgo = '';
  if (timestamp) {
    timeAgo = format(parseISO(timestamp), 'yyyy-MM-dd HH:mm:ss');
    // const timePeriod = formatDistanceToNow(date);
    // timeAgo = `${timePeriod} ago`;
  }

  return  <div>{timeAgo}</div>
}

export default TimeAgo;