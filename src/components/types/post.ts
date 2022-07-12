import { Item } from "./Item";

export interface Post extends Item {
  userId: string,
  body?: string
};
