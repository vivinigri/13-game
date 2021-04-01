import dayjs from 'dayjs';

export const calendarConfig = {
  sameDay: '[Today at] h:mm A', // The same day ( Today at 2:30 AM )
  nextDay: '[Tomorrow]', // The next day ( Tomorrow at 2:30 AM )
  nextWeek: 'dddd', // The next week ( Sunday at 2:30 AM )
  lastDay: '[Yesterday]', // The day before ( Yesterday at 2:30 AM )
  lastWeek: '[Last] dddd', // Last week ( Last Monday at 2:30 AM )
  sameElse: 'L', // Everything else by user locale (09/30/2020, 30.09.2020 etc)
};

export const formatRefreshedAt = (date?: string) => {
  const dateObject = dayjs(date);
  if (!dateObject.isValid()) {
    return '';
  }
  return dateObject.calendar(dayjs(), calendarConfig);
};

export const formatUpdatedAt = (date?: string) => {
  const dateObject = dayjs(date);
  if (!dateObject.isValid()) {
    return '';
  }
  const dateString = dateObject.calendar(dayjs(), calendarConfig);
  return 'As of ' + dateString[0].toLowerCase() + dateString.slice(1);
};

export const formatRecentDate = (date?: string, short?: boolean) => {
  const dateObject = dayjs(date);
  if (!dateObject.isValid()) {
    return '';
  }

  const dayDifference = dateObject.diff(dayjs());

  if (dayDifference === 0) {
    return 'Today';
  }
  if (dayDifference === 1) {
    return 'Yesterday';
  }
  if (dayDifference > 1 && dayDifference <= 7) {
    return dateObject.format(short ? 'ddd' : 'dddd');
  }
  if (dayDifference > 7 && dayDifference < 31) {
    return dateObject.format('MMMM Do');
  }
  // Date(date).toLocaleDateString();
  return dateObject.format('L');
};
