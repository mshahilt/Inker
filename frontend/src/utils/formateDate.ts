export const formatDateToMonthYear = (dateInput: Date | string): string => {
    const date = new Date(dateInput);
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  