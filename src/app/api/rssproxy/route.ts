import { NextRequest, NextResponse } from "next/server";
import Parser from "rss-parser";

const nyaaSearchTemplate = "https://nyaa.si/?page=rss&q=";
const bangumiSearchTemplate = "https://bangumi.moe/rss/search/";

const parser = new Parser();

interface RssSource {
  nyaa: any;
  bangumi: any;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const site = searchParams.get("site");
  const query = searchParams.get("query");

  if (site === "nyaa") {
    const q = encodeURIComponent(query as string);
    const feed = await fetch(nyaaSearchTemplate + q)
      .then((data) => data.text())
      .then((data) => parser.parseString(data));
    return NextResponse.json(feed);
  }

  if (site === "bangumi") {
    const q = encodeURIComponent(query as string);
    const feed = await fetch(bangumiSearchTemplate + q)
      .then((data) => data.text())
      .then((data) => parser.parseString(data));
    return NextResponse.json(feed);
  }

  return new NextResponse("", { status: 404 });

  //   const res: RssSource = await Promise.all([
  //     parser.parseURL(nyaaSearchTemplate + query),
  //     parser.parseURL(bangumiSearchTemplate + query),
  //   ]).then((feeds) => {
  //     return { nyaa: feeds[0], bangumi: feeds[1] };
  //   });

  //   return NextResponse.json(res);
}
