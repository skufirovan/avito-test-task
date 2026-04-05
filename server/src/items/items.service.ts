import type { Item } from "../types.ts";
import { itemsRepository } from "./items.repository.ts";
import { doesItemNeedRevision } from "../utils.ts";
import { ItemUpdateInput } from "src/validation.ts";

export const itemsService = {
  getById(id: number) {
    const item = itemsRepository.findById(id);

    if (!item) {
      return null;
    }

    return {
      ...item,
      needsRevision: doesItemNeedRevision(item),
    };
  },

  getList({
    q,
    limit,
    skip,
    needsRevision,
    categories,
    sortColumn,
    sortDirection,
  }: {
    q: string;
    limit: number;
    skip: number;
    needsRevision?: boolean;
    categories?: string[];
    sortColumn?: "title" | "createdAt";
    sortDirection?: "asc" | "desc";
  }) {
    const filteredItems = itemsRepository.findAll().filter((item) => {
      return (
        item.title.toLowerCase().includes(q.toLowerCase()) &&
        (!needsRevision || doesItemNeedRevision(item)) &&
        (!categories?.length || categories.includes(item.category))
      );
    });

    const sortedItems = filteredItems.toSorted((item1, item2) => {
      if (!sortDirection || !sortColumn) {
        return 0;
      }

      let comparisonValue = 0;

      if (sortColumn === "title") {
        comparisonValue = item1.title.localeCompare(item2.title);
      }

      if (sortColumn === "createdAt") {
        comparisonValue =
          new Date(item1.createdAt).valueOf() -
          new Date(item2.createdAt).valueOf();
      }

      return sortDirection === "desc" ? -comparisonValue : comparisonValue;
    });

    return {
      items: sortedItems.slice(skip, skip + limit).map((item) => ({
        id: item.id,
        category: item.category,
        title: item.title,
        price: item.price,
        needsRevision: doesItemNeedRevision(item),
      })),
      total: filteredItems.length,
    };
  },

  update(id: number, data: ItemUpdateInput) {
    const index = itemsRepository.findIndexById(id);

    if (index === -1) {
      return null;
    }

    const currentItem = itemsRepository.findAll()[index];

    const updatedItem: Item = {
      ...currentItem,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    itemsRepository.updateByIndex(index, updatedItem);
    return updatedItem;
  },
};
