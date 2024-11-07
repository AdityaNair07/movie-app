export const ratingToPercentage = (rating) => {
  return (rating * 10).toFixed(0);
};

export const ratingColor = (rating) => {
  return rating >= 8 ? "teal" : rating >= 5 ? "orange.400" : "red.800";
};

export const minutesToHours = (min) => {
  return Math.floor(min / 60) + "h " + (min % 60) + "m";
};
