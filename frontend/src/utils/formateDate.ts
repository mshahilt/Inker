/**
 * Date object or a date string.('2023-10-26T10:00:00Z') => "October 2023"
 */
export const formatDateToMonthYear = (dateInput: Date | string): string => {
  const date = new Date(dateInput);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

/**
 * (e.g., "Today at 02:30 PM", "Yesterday at 09:15 AM", "Jan 15, 2020 at 03:05 AM").
 */
export function formatBlogTimestamp(timestamp: string | Date): string {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  if (isToday) {
    return `Today at ${timeString}`;
  }
  if (isYesterday) {
    return `Yesterday at ${timeString}`;
  }
  const dateString = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return `${dateString} at ${timeString}`;
}

export const formatRelativeTime = (timestamp: string | Date): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval + (interval === 1 ? " year ago" : " years ago");
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + (interval === 1 ? " month ago" : " months ago");
  }
  interval = Math.floor(seconds / 604800);
  if (interval >= 1) {
    return interval + (interval === 1 ? " week ago" : " weeks ago");
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + (interval === 1 ? " day ago" : " days ago");
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + (interval === 1 ? " hour ago" : " hours ago");
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + (interval === 1 ? " minute ago" : " minutes ago");
  }
  return "just now";
};
