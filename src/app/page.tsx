"use client";

import { calendar, calendarItem, item } from "@/bangumi-api/type";
import { useEffect, useState } from "react";
import StoreContext from "./lib/store";
import RssEditor from "@/components/RssEditor";
import WeekdayItemMobile from "@/components/WeekdayItemMobile";
import WeekdayView from "@/components/WeekdayView";
import WeekdayViewMobile from "@/components/WeekdayViewMobile";
import { feed, feedCache } from "@/types/interface";
import { time } from "console";

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

  const [feedCache, setFeedCache] = useState<feedCache>({});
  const addFeedCache = (id: number, feed: feed, keyword: string) => {
    // if exist
    if (feedCache[id]) {
      const timeout = feedCache[id].timeout;
      clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      if (feedCache[id]) {
        feedCache[id].valid = false;
      }
    }, 1000 * 60 * 60 * 24); // cache miss after 24 h
    setFeedCache({
      ...feedCache,
      [id]: { feed, timeout: timeout, keyword, valid: true },
    });
  };
  const removeFeedCache = (id: number) => {
    if (feedCache[id] === undefined) return;

    const newCache = { ...feedCache };
    delete newCache[id];
    // clear timeout
    const timeout = feedCache[id].timeout;
    clearTimeout(timeout);

    setFeedCache(newCache);
  };

  return (
    <main className="tablet:max-w-4xl mx-auto">
      <h1 className="flex w-full items-center justify-center mt-4 tablet:text-2xl text-xl font-bold bg-gradient-to-r bg-clip-text from-pink-600 to-pink-50 text-transparent">
        新番 RSS 聚合
      </h1>
      <StoreContext.Provider
        value={{
          items,
          addItem,
          removeItem,
          feedCache,
          addFeedCache,
          removeFeedCache,
        }}
      >
        <RssEditor />
        {!loading && (
          <WeekdayView calendar={calendar} className="tablet:flex hidden" />
        )}
        {!loading && (
          <WeekdayViewMobile
            calendar={calendar}
            className="tablet:hidden block mx-2"
          />
        )}
      </StoreContext.Provider>
    </main>
  );
}
