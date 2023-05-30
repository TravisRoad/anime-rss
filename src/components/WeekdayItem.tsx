import React, { useEffect, useState } from "react";
import type { item } from "@/bangumi-api/type";
import Image from "next/image";
import StoreContext from "@/app/lib/store";

function Item({ item }: { item: item }) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const name = item.name_cn ? item.name_cn : item.name;
  const bgUrl = item.images ? item.images.common : "";
  const { items, addItem, removeItem } = React.useContext(StoreContext);

  const handleClick = () => {
    if (isChecked) {
      removeItem(item);
    } else {
      addItem(item);
    }
  };

  useEffect(() => {
    const i = items.find((i) => i.id === item.id);
    setIsChecked(i !== undefined);
  }, [item.id, items]);

  return (
    <div
      className="relative overflow-clip w-32 h-32 group hover:-translate-y-1 hover:shadow-2xl hover:ring-2 shadow-nord-0 hover:scale-110 hover:z-50"
      onClick={handleClick}
    >
      {bgUrl && (
        <Image
          src={bgUrl}
          alt=""
          fill={true}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        ></Image>
      )}
      <input
        checked={isChecked}
        type="checkbox"
        name="image-checkbox"
        className="absolute top-0 right-0 z-20"
        onChange={(e) => {}}
      />
      <div
        className={`absolute bg-black z-10 w-full h-full top-0 left-0 ${
          isChecked ? "opacity-70" : "opacity-0"
        } transition-all duration-150 ease-in`}
      ></div>
      <div className="absolute bottom-0 text-xs text-white bg-slate-600/80 group-hover:bg-slate-700 w-full text-center group-hover:whitespace-normal whitespace-nowrap">
        {name}
      </div>
    </div>
  );
}
export default function WeekdayItem({
  weekday,
  items,
}: {
  weekday: string;
  items: item[];
}) {
  return (
    <div className="w-32">
      <h1 className="text-center border-2 ">{weekday}</h1>
      {items.map((item: item) => (
        // <div key={item.url}>{item.images?.common}</div>
        <Item item={item} key={item.id} />
      ))}
    </div>
  );
}
