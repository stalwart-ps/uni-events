// src/utils.js
export const generateUniqueId = () => {
  const randomNum = Math.floor(Math.random() * 100000); // 0-99999
  const padded = String(randomNum).padStart(5, "0"); // ensures 5 digits
  return `HPTU${padded}`;
};
