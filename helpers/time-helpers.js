export const getFormattedTime = (date) => {
  return new Date(date).toLocaleString("en-US", { timeZone: "Asia/Karachi" });
};

export const getStringFormattedTime = (date) => {
  return new Date(date).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};

/**
 * @function formatDate
 * @description This function formats date to format DD-MON-YYYY HH24:MI:SS
 * @param date
 * @returns
 */
export const formatDate = (date) => {
  const formattedDate = `${
    (date.getDate() < 10 ? "0" : "") + date.getDate()
  }-${date
    .toLocaleString("default", { month: "short" })
    .toUpperCase()}-${date.getFullYear()} ${date.toLocaleTimeString("en-US", {
    hour12: false,
  })}`;

  return formattedDate;
}; // end of formatDate
