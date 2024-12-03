'use client';

import { Header } from "@/components/Header";
import { MainContent } from "@/components/MainContent";
import { GroceryList, ShoppingItem } from "@/types";
import { useState } from 'react';

const INITIAL_LISTS: GroceryList[] = [
  {
    id: '1',
    date: '11/09/2024',
    items: [
      { id: '1', name: 'carrots', quantity: 4, store: 'Costco' },
      { id: '2', name: 'potatoes', quantity: 5, store: 'Costco' },
    ],
  },
  {
    id: '2',
    date: '11/08/2024',
    items: [
      { id: '3', name: 'tomatoes', quantity: 2, store: 'Whole Foods' },
      { id: '4', name: 'onions', quantity: 3, store: 'Whole Foods' },
    ],
  },
];

export default function Home() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [recentLists] = useState<GroceryList[]>(INITIAL_LISTS);

  return (
    <div className="min-h-screen bg-[#EFF5F3]">
      <Header />
      <MainContent
        items={items}
        setItems={setItems}
        recentLists={recentLists}
      />
    </div>
  );
}
