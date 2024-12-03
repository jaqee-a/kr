export interface ShoppingItem {
  arabic_name?: string;
  english_name: string;
  supplier: string;
  quantity: number;
};

export interface GroceryList {
  items: ShoppingItem[];
};

export interface GroceryOrder {
  id: string;
  items: ShoppingItem[];
  date: string;
};

export enum State {
  INPUT,
  LIST,
  ORDER_CONFIRMED
}
