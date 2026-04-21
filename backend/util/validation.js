function isValidText(value, minLength = 1) {
  return value && value.trim().length >= minLength;
}

function isValidDate(value) {
  const date = new Date(value);
  return Boolean(value) && !Number.isNaN(date.getTime());
}

function isValidImageUrl(value) {
  return Boolean(value) && /^https?:\/\//.test(value);
}

function isValidEmail(value) {
  return Boolean(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

exports.isValidText = isValidText;
exports.isValidDate = isValidDate;
exports.isValidImageUrl = isValidImageUrl;
exports.isValidEmail = isValidEmail;
