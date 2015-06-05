module.exports = function pad(str, width, char) {
  if (str.length >= width) {
    return str;
  }
  return new Array(width - str.length + 1).join(char) + width;
};
