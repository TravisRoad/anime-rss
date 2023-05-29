import type { calendar, calendarItem, item } from "@/bangumi-api/type";
import WeekdayItemMobile from "./WeekdayItemMobile";
import { Tab } from "@headlessui/react";
import classNames from "@/utils/classNames";

export default function WeekdayView({
  calendar,
  className,
}: {
  calendar: calendar;
  className?: string;
}) {
  return (
    <div className={` gap-1 justify-center ${className ? className : ""} `}>
      <Tab.Group>
        <Tab.List
          id="tablist"
          className="snap-x overflow-x-scroll flex space-x-1 rounded-[4px] bg-nord-10/40 p-1 scrollbar-none sm:max-w-[28rem] max-w-[22rem] mx-auto shadow-inner"
        >
          {calendar.map((calendarItem: calendarItem) => (
            <Tab
              key={calendarItem.weekday.id}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-[4px] py-2 px-2 my-0.5 whitespace-nowrap text-sm font-medium leading-5 text-nord-0 ",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-nord-10/50 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-nord-5 shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {calendarItem.weekday.cn}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="bg-nord-bgLight sm:max-w-[28rem] max-w-[22rem] mx-auto mt-2 p-4 rounded-[4px]">
          {calendar.map((calendarItem: calendarItem) => (
            <Tab.Panel
              key={calendarItem.weekday.id}
              className=" sm:w-[24rem] grid-cols-3 sm:grid-cols-4 grid gap-0 gap-x-0 mx-auto w-72 "
            >
              {calendarItem.items.map((item: item) => (
                <div
                  key={item.id}
                  // title={item.name_cn ? item.name_cn : item.name}
                  className=""
                >
                  <WeekdayItemMobile item={item} />
                </div>
              ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
