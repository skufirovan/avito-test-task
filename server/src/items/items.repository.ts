import items from "../../data/items.json" with { type: "json" };
import type { Item } from "../types.ts";

const ITEMS = items as Item[];

export const itemsRepository = {
  findById(id: number) {
    return ITEMS.find((item) => item.id === id) ?? null;
  },

  findIndexById(id: number) {
    return ITEMS.findIndex((item) => item.id === id);
  },

  findAll() {
    return ITEMS;
  },

  updateByIndex(index: number, item: Item) {
    ITEMS[index] = item;
    return ITEMS[index];
  },
};
