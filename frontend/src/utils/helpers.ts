
export const isObjectEmpty = (objectName: Record<string, any>) => {
  if (objectName === null || objectName === undefined) {
    return true;
  }
  return Object?.keys(objectName).length === 0;
};

export const isLocalStorageAvailable = () => {
  let test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getFormattedDateString = (date: number | Date | string) => {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export function getFormatMessageTimestamp(timestamp?: string | null): string | void {
  if (timestamp) {
    const dateObject = new Date(timestamp);
    return dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

export function sortDesc(data: any) {
  return data?.sort((a: any, b: any) => {
    const dateA = new Date(a.last_message_timestamp ?? a.created_at);
    const dateB = new Date(b.last_message_timestamp ?? b.created_at);
    return dateB.getTime() - dateA.getTime();
  });
}

export const formatNumber = (n: number) => {
  if (n < 1e6) return n;
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + ' million(s)';
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + ' billion(s)';
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + ' trillion(s)';
};
