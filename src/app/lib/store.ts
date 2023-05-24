import { item } from "@/bangumi-api/type";
import React from "react";

interface StoreType {
  items: item[];
  addItem: (item: item) => void;
  removeItem: (item: item) => void;
}

const StoreContext = React.createContext<StoreType>({
  items: [],
  addItem: (item: item) => {},
  removeItem: (item: item) => {},
});

export default StoreContext;
