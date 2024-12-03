export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  store: string;
  notes?: string;
}

export interface GroceryList {
  id: string;
  date: string;
  items: ShoppingItem[];
}

export enum State {
  INPUT,
  LIST,
}
