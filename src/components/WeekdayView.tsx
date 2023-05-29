import type { calendar, calendarItem } from "@/bangumi-api/type";
import WeekdayItem from "./WeekdayItem";

export default function WeekdayView({
  calendar,
  className,
}: {
  calendar: calendar;
  className?: string;
}) {
  return (
    <div className={` gap-1 justify-center ${className ? className : ""} `}>
      {calendar.map((calendarItem: calendarItem) => (
        <WeekdayItem
          key={calendarItem.weekday.id}
          items={calendarItem.items}
          weekday={calendarItem.weekday.cn}
        ></WeekdayItem>
      ))}
    </div>
  );
}
