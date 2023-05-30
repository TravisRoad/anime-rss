"use client";

import StoreContext from "@/app/lib/store";
import { item } from "@/bangumi-api/type";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { feed, feedItem } from "@/types/interface";
import classNames from "@/utils/classNames";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { Dialog } from "@headlessui/react";

function RssContent({
  item,
  keyword,
}: {
  item: item;
  keyword: {
    keywordMap: { [key: number]: string };
    addKeyword: (id: number, keyword: string) => void;
    removeKeyword: (id: number) => void;
  };
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [feedObj, setFeedObj] = useState<feed>({
    title: "",
    description: "",
    link: "",
    paginationLinks: { self: "" },
    feedUrl: "",
    items: [],
  });

  const name = item.name_cn ? item.name_cn : item.name;
  const [input, setInput] = useState<string>(name);

  const { feedCache, addFeedCache } = useContext(StoreContext);

  const updateFeedCache = (query: string) => {
    if (
      feedCache[item.id] &&
      feedCache[item.id].keyword === query &&
      feedCache[item.id].valid
    ) {
      setFeedObj(feedCache[item.id].feed);
      setLoading(false);
    } else {
      fetch(`/api/rssproxy?site=nyaa&query=${encodeURIComponent(query)}`)
        .then((data) => data.json())
        .then((feed) => {
          setLoading(false);
          setFeedObj(feed);
          addFeedCache(item.id, feed, query);
        });
    }
  };

  useEffect(() => {
    var query = name;
    if (feedCache[item.id]) {
      query = feedCache[item.id].keyword;
      setInput(query);
    }
    if (
      feedCache[item.id] &&
      feedCache[item.id].keyword === query &&
      feedCache[item.id].valid
    ) {
      setFeedObj(feedCache[item.id].feed);
      setLoading(false);
    } else {
      fetch(`/api/rssproxy?site=bangumi&query=${encodeURIComponent(query)}`)
        .then((data) => data.json())
        .then((feed) => {
          setLoading(false);
          setFeedObj(feed);
          addFeedCache(item.id, feed, query);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mt-2 mb-2 flex items-center ">
        <label className="ml-2">搜索关键字</label>
        <input
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          value={input}
          className=" ml-2 border py-0.5 px-1 sm:basis-0"
        />
        <button
          type="button"
          className="ml-2 border rounded-md px-2 py-0.5 "
          onClick={() => {
            updateFeedCache(input);
            setLoading(true);
          }}
        >
          搜
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center mt-4">
          <div className="flex flex-col justify-center">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="max-h-[50vh]">
          <div className="overflow-y-scroll flex flex-col gap-y-1">
            {feedObj.items.map((item: feedItem) => (
              <Link href={item.guid} key={item.guid}>
                <div
                  className="border rounded-md mr-2 px-2 py-1 hover:underline"
                  title={item.title}
                >
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default function RssEditor() {
  const { items, removeItem } = useContext(StoreContext);
  const [keywordMap, setKeywordMap] = useState<{ [key: number]: string }>({});
  const { feedCache, addFeedCache, removeFeedCache } = useContext(StoreContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(true);

  const addKeyword = (id: number, keyword: string) => {
    setKeywordMap({ ...keywordMap, [id]: keyword });
  };
  const removeKeyword = (id: number) => {
    if (!keywordMap[id]) return;
    const map = { ...keywordMap };
    delete map[id];
    setKeywordMap(map);
  };

  useEffect(() => {
    setDisable(items.length === 0);
  }, [items]);

  return (
    <div className=" my-4 tablet:max-w-[64rem] mx-auto sm:max-w-[28rem] max-w-[22rem] max-h-[50vh]">
      <Toaster />
      <Tab.Group
        as="div"
        className="flex tablet:flex-row flex-col gap-x-2 tablet:min-h-[30vh] tablet:max-h-[35vh] max-h-[50vh] min-h-[50vh] "
      >
        <div className="flex flex-col tablet:min-h-[30vh] tablet:max-h-[35vh] min-h-[25vh] max-h-[25vh] basis-1/4 tablet:gap-y-4 mb-2 tablet:min-w-[30%]">
          <Tab.List className="overflow-y-auto space-y-1 items-start tablet:basis-4/5 border-2 rounded-md px-2 py-1 bg-nord-10/40 min-h-[19vh] ">
            {items.map((item: item) => (
              <Tab
                key={item.id}
                className={({ selected }: { selected: boolean }) =>
                  classNames(
                    " w-full text-start text-nord-0 py-0.5 px-1 rounded-md flex justify-between overflow-hidden flex-shrink-0",
                    selected
                      ? "bg-nord-5 shadow"
                      : "hover:bg-nord-5/20 hover:text-white"
                  )
                }
                title={item.name_cn ? item.name_cn : item.name}
              >
                <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                  {item.name_cn ? item.name_cn : item.name}
                </span>
                <span className="px-2 rounded" onClick={() => removeItem(item)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </Tab>
            ))}
          </Tab.List>
          <button
            onClick={() => {
              setLoading(true);
              const lz: any[] = [];
              items.forEach((item: item) => {
                var keyword = item.name_cn ? item.name_cn : item.name;
                if (feedCache[item.id]) keyword = feedCache[item.id].keyword;
                lz.push({ keyword, site: "bangumi" });
              });
              const value = encodeURIComponent(JSON.stringify(lz));
              const href = "/api/rss?data=" + value;
              const url =
                window.location.protocol + "//" + window.location.host + href;
              toast(
                (t) => (
                  <span className="flex">
                    <input
                      type="text"
                      readOnly
                      value={url}
                      className="border mr-2 basis-4/6"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(url);
                        toast.dismiss(t.id);
                        toast.success("拷贝成功");
                      }}
                      className="text-sm bg-nord-9 rounded text-white px-1 py-0.5 mx-1  hover:bg-nord-10/[0.95] transition duration-200"
                    >
                      拷贝
                    </button>
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="text-sm border-2 px-1 py-0.5 rounded-md border-nord-11/40"
                    >
                      取消
                    </button>
                  </span>
                ),
                { duration: 5000 }
              );
              setLoading(false);
            }}
            className={`border rounded-md p-2 bg-nord-9/40 ${
              disable
                ? "cursor-not-allowed grayscale text-gray-400"
                : "hover:bg-nord-10/60 hover:text-white hover:ring-2"
            } md:text-base text-sm mt-2 tablet:mt-0`}
            disabled={disable}
          >
            {loading ? "生成中..." : "获得聚合 RSS 链接"}
          </button>
          {/* </div> */}
        </div>
        <Tab.Panels className="basis-3/4 border-2 rounded-md px-2 py-1 text-xs overflow-x-hidden min-h-[25vh]">
          <div>
            {items.map((item: item) => (
              <Tab.Panel key={item.id}>
                <RssContent
                  item={item}
                  keyword={{ keywordMap, addKeyword, removeKeyword }}
                />
              </Tab.Panel>
            ))}
          </div>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
