import { item } from "@/bangumi-api/type";
import { feed, feedCache } from "@/types/interface";
import React from "react";

interface StoreType {
  items: item[];
  addItem: (item: item) => void;
  removeItem: (item: item) => void;
  feedCache: feedCache;
  addFeedCache: (id: number, feed: feed, keyword: string) => void;
  removeFeedCache: (id: number) => void;
}

const StoreContext = React.createContext<StoreType>({
  items: [],
  addItem: (item: item) => {},
  removeItem: (item: item) => {},
  feedCache: {},
  addFeedCache: (id: number, feed: feed, keyword: string) => {},
  removeFeedCache: (id: number) => {},
});

export default StoreContext;
