export const truncateText = (text, max = 100) => {
  return text.length > max ? text.substring(0, max) + '...' : text;
};

export const capitalize = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1);