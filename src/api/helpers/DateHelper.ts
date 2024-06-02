import { format, isToday } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const formatTime = (
  utcDate: Date,
  timeZone: string = "America/Sao_Paulo"
) => {
  const zonedDate = toZonedTime(utcDate, timeZone);
  if (isToday(zonedDate)) {
    return format(zonedDate, "HH:mm");
  } else {
    return format(zonedDate, "dd/MM");
  }
};
