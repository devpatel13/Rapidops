// Sample date and time strings
const dateString = "15/03/2022";
const timeString = "09:30:am";

// Parse date string (dd/mm/yyyy)
const [day, month, year] = dateString.split("/");
// const parsedDate = new Date(`${year}-${month}-${day}`);

// Parse time string (hours:minutes:am/pm)
const [hours, minutes, period] = timeString.split(":");
// let [] = time.split(":");
if (period.toLowerCase() === "pm" && hours !== "12") {
  hours = String(parseInt(hours) + 12); // Convert to 24-hour format
} else if (period.toLowerCase() === "am" && hours === "12") {
  hours = "00"; // Midnight
}
const parsedTime = new Date(0, 0, 0, parseInt(hours), parseInt(minutes));

// Combine date and time
const combinedDateTime = new Date(
  parseInt(year),
  parseInt(month - 1),
  parseInt(day),
  parseInt(hours),
  parseInt(minutes)
);

console.log(combinedDateTime);
