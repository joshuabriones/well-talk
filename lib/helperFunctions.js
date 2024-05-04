export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extracting components
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const day = date.getDate();

  // Forming the formatted date string
  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
};
