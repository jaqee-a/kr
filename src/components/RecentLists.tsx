import { Clock } from 'lucide-react';
import type { GroceryList } from '../types';

interface RecentListsProps {
  lists: GroceryList[];
  onReuse: (list: GroceryList) => void;
}

export function RecentLists({ lists, onReuse }: RecentListsProps) {
  return (
    <div className="space-y-2 bg-white p-4 shadow rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-700">Your latest shopping lists</h2>
        <button className="text-sm font-bold text-gray-400 hover:text-gray-600">
          See full list
        </button>
      </div>
      <div className="space-y-2">
        {lists.map((list) => (
          <div key={list.id} className="bg-[#FAFAFA] border border-[#D9D9D9] rounded-lg p-4">
            <div className='flex justify-between items-center'>
              <div className="flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-m font-bold text-black">{list.date}</span>
                </div>
                <p className="mt-2 text-sm text-black">
                  {list.items.map((item) => `${item.quantity}${item.name}`).join(', ')}
                </p>
              </div>
              <button
                onClick={() => onReuse(list)}
                className="px-3 py-1 text-sm bg-gray-900 text-white h-[32px] rounded-md hover:bg-gray-800"
              >
                Reuse
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
