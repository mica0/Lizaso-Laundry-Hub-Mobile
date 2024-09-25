import { DateTime } from "luxon";

export const timeAgo = (date) => {
  const now = DateTime.local();
  const requestDate = DateTime.fromISO(date); // Ensure the date is in ISO format

  const diffInSeconds = Math.floor(now.diff(requestDate, "seconds").seconds);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} days ago`;
};
