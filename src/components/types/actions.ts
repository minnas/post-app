import { Item } from "./Item";

export interface IItemStore {
  update(item: Item): boolean;
  remove(id: string): boolean;
};
