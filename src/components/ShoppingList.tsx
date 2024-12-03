import { Minus, Plus, Store } from 'lucide-react';
import type { ShoppingItem } from '../types';

interface ShoppingListProps {
  items: ShoppingItem[];
  onUpdateQuantity: (id: string, change: number) => void;
}

export function ShoppingList({ items, onUpdateQuantity }: ShoppingListProps) {
  return (
    <>
    <div className="space-y-2 bg-white p-4 shadow rounded-lg">
      <h2 className="font-medium text-black">Shopping list</h2>
      <div className="rounded-lg flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.id} className="p-4 flex bg-[#FAFAFA] border border-[#D9D9D9] rounded-lg items-center justify-between">
            <p className="text-sm text-black">{item.name}</p>
            <p className="text-sm text-black">{item.store}</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onUpdateQuantity(item.id, -1)}
                className="p-1 border-[2px] border-gray-400 rounded-full hover:bg-gray-100"
              >
                <Minus className="w-4 h-4 text-gray-400" />
              </button>
              <span className="w-8 text-center text-black">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, 1)}
                className="p-1 border-[2px] border-gray-400 rounded-full hover:bg-gray-100"
              >
                <Plus className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
      <div className='w-full flex justify-end'>
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-md place-self-end"
        >
          Order
        </button>
      </div>
    </>
  );
}
