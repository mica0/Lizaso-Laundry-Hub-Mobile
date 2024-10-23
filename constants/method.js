import { format, isToday, isYesterday, parseISO } from "date-fns";
export const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

export const truncateMessage = (message, limit = 30) => {
  return message.length > limit ? message.slice(0, limit) + "..." : message;
};

export const formatDate = (dateString) => {
  const date = parseISO(dateString); // Parse the date string to a Date object
  if (isToday(date)) {
    return format(date, "hh:mm a"); // Format as "8:08 PM"
  } else if (isYesterday(date)) {
    return "Yesterday"; // Format for yesterday
  } else if (date.getTime() > Date.now() - 604800000) {
    // Within the last week
    return format(date, "eee"); // Format as "Tue"
  } else {
    return format(date, "MMM d"); // Format as "Oct 1"
  }
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance.toFixed(1);
};

[
  {
    addressLine: "Hhh",
    city: "Bulakan",
    country: "Philippines",
    latitude: 14.7634551,
    longitude: 120.8976699,
    province: "Bulacan",
  },
];
