import { ShoppingInput } from './ShoppingInput';
import { ShoppingList } from './ShoppingList';
import { RecentLists } from './RecentLists';
import { type ShoppingItem, type GroceryList, State, GroceryOrder } from '../types';
import { useState } from 'react';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { AuthForm } from './AuthForm';
import OrderConfirmed from './OrderConfirmed';

interface MainContentProps {
  items: ShoppingItem[];
  setItems: React.Dispatch<React.SetStateAction<ShoppingItem[]>>;
  recentLists: GroceryList[];
}

export function MainContent({
  items,
  setItems,
  recentLists,
}: MainContentProps) {
  const [inputFocused, setInputFocused] = useState(false);
  const [currentState, setCurrentState] = useState<State>(State.INPUT);

  const handleAddItem = (input: string) => {
    const [quantity, ...nameParts] = input.split(' ');
    const storeParts = nameParts.join(' ').split(' from ');

    const newItem: ShoppingItem = {
      english_name: storeParts[0],
      quantity: parseInt(quantity) || 1,
      supplier: storeParts[1] || 'Any store',
    };

    setItems((prev) => [...prev, newItem]);
    setCurrentState(State.LIST);
  };

  const handleUpdateQuantity = (name: string, change: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.english_name === name
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const handleNewOrder = () => {
    setCurrentState(State.INPUT);
  };
  
  const handleOrderConfirmed = () => {
    setCurrentState(State.ORDER_CONFIRMED);
  };

  const handleReuseList = (list: GroceryOrder) => {
    setItems(list.items);
    setCurrentState(State.LIST);
  };

  const renderState = () => {
    switch (currentState) {
      case State.INPUT:
        return renderInputState();
      case State.LIST:
        return renderListState();
      case State.ORDER_CONFIRMED:
        return renderOrderConfirmedState();
    }
  }

  const renderOrderConfirmedState = () => {
    return <>
      <div className="flex flex-col items-center gap-8 mb-8">
        <img 
          src='./logo.png'
          width={200}
        />
        <h1 className="text-3xl font-semibold text-center text-gray-900">
          Order Confirmed
        </h1>
      </div>
      <OrderConfirmed onNewOrder={handleNewOrder} />
    </>
  }

  const renderListState = () => {
    return <>
      <div className="flex flex-col items-center gap-8 mb-8">
        <img 
          src='./logo.png'
          width={200}
        />
        <h1 className="text-3xl font-semibold text-center text-gray-900">
          Create your shopping list
        </h1>
      </div>
      <ShoppingList items={items} onUpdateQuantity={handleUpdateQuantity} onOrderConfirmed={handleOrderConfirmed} />;
    </>
  }

  const renderInputState = () => {
    return <>
      <div className="flex flex-col items-center gap-8 mb-8">
        <img 
          src='./logo.png'
          width={200}
        />
        <h1 className="text-3xl font-semibold text-center text-gray-900">
          Create your shopping list
        </h1>
      </div>
      <div className="space-y-4">
        <ShoppingInput onAdd={handleAddItem} onFocus={setInputFocused} />
      </div>

      {/* {!inputFocused && ( */}
      {/*   <RecentLists lists={recentLists} onReuse={handleReuseList} /> */}
      {/* )} */}
    </>
  }

  return (
    <>
      <SignedOut>
        <AuthForm />
      </SignedOut>
      <SignedIn>
        <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
          {renderState()}
        </main>
      </SignedIn>
    </>
  );
}
