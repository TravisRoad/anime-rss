"use client";

import { calendar, calendarItem, item } from "@/bangumi-api/type";
import WeekdayView from "@/components/WeekdayView";
import { useEffect, useState } from "react";
import StoreContext from "./lib/store";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [calendar, setCalendar] = useState<calendar>([]);

  useEffect(() => {
    fetch("/api/calendar")
      .then((data) => data.json())
      .then((data) => setCalendar(data))
      .then(() => setLoading(false));
  }, []);

  const [items, setItems] = useState<item[]>([]);
  const addItem = (item: item) => {
    setItems((items) => [...items, item]);
  };
  const removeItem = (item: item) => {
    setItems((items) => items.filter((i) => i.id !== item.id));
  };

  return (
    <main>
      <StoreContext.Provider value={{ items, addItem, removeItem }}>
        <div className="flex gap-1 justify-center">
          {!loading &&
            calendar.map((calendarItem: calendarItem) => (
              <WeekdayView
                key={calendarItem.weekday.id}
                items={calendarItem.items}
                weekday={calendarItem.weekday.cn}
              ></WeekdayView>
            ))}
        </div>
      </StoreContext.Provider>
    </main>
  );
}
