export const removeLastCandyMarkup = (value = '') => {
  if (!value) {
    return '';
  }

  const candyTagPattern = /<img[^>]*\s*\/?>\s*$/i;
  const match = value.match(candyTagPattern);

  if (match) {
    return value.slice(0, match.index);
  }

  return value.slice(0, -1);
};
