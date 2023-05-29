interface foo {
  site: string;
  keyword: string[];
  feed: feed;
}

declare type feedCache = {
  [key: number]: {
    feed: feed;
    timeout: NodeJS.Timeout;
    keyword: string;
    valid: boolean; // false 缓存失效
  };
};

declare type feed = nyaaFeed;
declare type feedItem = nyaaItem;

interface nyaaFeed {
  title: string;
  description: string;
  link: string;
  paginationLinks: { self: string };
  feedUrl: string;
  items: nyaaItem[];
}

interface nyaaItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  guid: string;
  isoData: string;
}

export type { foo, feedCache, feed, feedItem };
export type { nyaaFeed, nyaaItem };
