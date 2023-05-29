import { feed } from "@/types/interface";
import { NextRequest, NextResponse } from "next/server";
import Parser from "rss-parser";
import RSS from "rss";

const parser = new Parser();

const templates: { [key: string]: string } = {
  nyaa: "https://nyaa.si/?page=rss&q=",
  //   nyaa: "https://bangumi.moe/rss/search/",
};

interface InputItem {
  keyword: string;
  site: string;
}
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const data = searchParams.get("data");

  if (data === "" || data === undefined || data === null)
    return new NextResponse("", { status: 400 });

  const json: InputItem[] = JSON.parse(data);

  const promises = json
    .map((item: InputItem) => templates[item.site] + item.keyword)
    .map((url) => fetch(url));

  const feeds = await Promise.all(promises).then(async (responses) => {
    const feedsPromises = responses.map(async (response) => {
      const text = await response.text();
      const feed = await parser.parseString(text);
      return feed;
    });
    const feeds = await Promise.all(feedsPromises);
    return feeds;
  });

  const newFeed = new RSS({
    title: json.map((item) => item.keyword).join("_"),
    description: `RSS Feed for ...`,
    feed_url: ``,
    site_url: ``,
  });

  feeds.forEach((feed) => {
    feed.items.forEach((item) => {
      newFeed.item({
        title: item.title as string,
        date: item.isoDate as string,
        url: item.link as string,
        guid: item.guid,
        description: item.description,
      });
    });
  });

  const xml = newFeed.xml({ indent: true });

  return new NextResponse(xml, { headers: { "content-type": "text/xml" } });
}
