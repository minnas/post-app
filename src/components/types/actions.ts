import { Item } from "./Item";

export interface IItemStore {
  update(item: Item): boolean;
  remove(id: string): boolean;
  addToBookmarks(item: Item): boolean
  removeFromBookmarks(id: String): boolean
};
