export const formatDateToMonthYear = (dateInput: Date | string): string => {
    const date = new Date(dateInput);
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  

  export function formatBlogTimestamp(timestamp: string | Date): string {
    const date = new Date(timestamp);
    const now = new Date();
  
    const isToday =
      date.toDateString() === now.toDateString();
  
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
      date.toDateString() === yesterday.toDateString();
  
    const timeString = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  
    if (isToday) {
      return `Today at ${timeString}`;
    }
  
    if (isYesterday) {
      return `Yesterday at ${timeString}`;
    }
  
    const dateString = date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  
    return `${dateString} at ${timeString}`;
  }
  