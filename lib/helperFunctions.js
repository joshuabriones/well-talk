import Cookies from "js-cookie";

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
export function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export function logout() {
  Cookies.remove("token");
  Cookies.remove("user");
  window.location.href = "/login";
}

export function getUserSession() {
  const user = Cookies.get("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
}
