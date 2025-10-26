import {format, formatDistanceToNow, isToday, isYesterday, isThisWeek, isThisMonth} from 'date-fns';

export const formatEntryDate = (timestamp: number): string => {
  const date = new Date(timestamp);

  if (isToday(date)) {
    return `Today at ${format(date, 'h:mm a')}`;
  }

  if (isYesterday(date)) {
    return `Yesterday at ${format(date, 'h:mm a')}`;
  }

  if (isThisWeek(date)) {
    return format(date, 'EEEE \'at\' h:mm a');
  }

  if (isThisMonth(date)) {
    return format(date, 'MMM d \'at\' h:mm a');
  }

  return format(date, 'MMM d, yyyy');
};

export const formatRelativeDate = (timestamp: number): string => {
  return formatDistanceToNow(new Date(timestamp), {addSuffix: true});
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return 'Good morning';
  } else if (hour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};

export const getDayOfWeek = (timestamp: number): string => {
  return format(new Date(timestamp), 'EEEE');
};

export const getMonthName = (timestamp: number): string => {
  return format(new Date(timestamp), 'MMMM');
};

export const getYear = (timestamp: number): number => {
  return new Date(timestamp).getFullYear();
};

export const getStartOfDay = (timestamp: number): number => {
  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

export const getEndOfDay = (timestamp: number): number => {
  const date = new Date(timestamp);
  date.setHours(23, 59, 59, 999);
  return date.getTime();
};

export const getStartOfWeek = (timestamp: number): number => {
  const date = new Date(timestamp);
  const day = date.getDay();
  const diff = date.getDate() - day;
  const sunday = new Date(date.setDate(diff));
  sunday.setHours(0, 0, 0, 0);
  return sunday.getTime();
};

export const getStartOfMonth = (timestamp: number): number => {
  const date = new Date(timestamp);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

export const getStartOfYear = (timestamp: number): number => {
  const date = new Date(timestamp);
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};
