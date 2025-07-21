// Converts "9:00am" to "09:00", "2:30pm" to "14:30"
export function to24Hour(time: string): string {
  const [timePart, meridian] = time.toLowerCase().split(/(am|pm)/);
  let [hour, minute] = timePart.trim().split(":").map(Number);
  if (meridian === "pm" && hour !== 12) hour += 12;
  if (meridian === "am" && hour === 12) hour = 0;
  return `${hour.toString().padStart(2, "0")}:${(minute || 0)
    .toString()
    .padStart(2, "0")}`;
}

// Converts Date to "9:00am", "12:30pm", etc.
export function formatTo12Hour(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const meridian = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  return `${hours}:${minutes.toString().padStart(2, "0")}${meridian}`;
}

// const slots = generateTimeSlots("9:00am", "12:00pm", 15);
// console.log(slots);
