export const isEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isPasswordStrong = (password) =>
  password.length >= 8;

export const isPhone = (phone) =>
  /^[6-9]\d{9}$/.test(phone);