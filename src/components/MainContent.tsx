import { nanoid } from 'nanoid';
import { ShoppingInput } from './ShoppingInput';
import { ShoppingList } from './ShoppingList';
import { RecentLists } from './RecentLists';
import { type ShoppingItem, type GroceryList, State } from '../types';
import { useState } from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { AuthForm } from './AuthForm';

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
      id: nanoid(),
      name: storeParts[0],
      quantity: parseInt(quantity) || 1,
      store: storeParts[1] || 'Any store',
    };

    setItems((prev) => [...prev, newItem]);
    setCurrentState(State.LIST);
  };

  const handleUpdateQuantity = (id: string, change: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const handleReuseList = (list: GroceryList) => {
    setItems(list.items);
  };

  const renderState = () => {
    switch (currentState) {
      case State.INPUT:
        return renderInputState();
      case State.LIST:
        return renderListState();
    }
  }

  const renderListState = () => {
    return <ShoppingList items={items} onUpdateQuantity={handleUpdateQuantity} />;
  }

  const renderInputState = () => {
    return <>
      <div className="space-y-4">
        <ShoppingInput onAdd={handleAddItem} onFocus={setInputFocused} />
      </div>

      {!inputFocused && (
        <RecentLists lists={recentLists} onReuse={handleReuseList} />
      )}
    </>
  }

  return (
    <>
      <SignedOut>
        <AuthForm />
      </SignedOut>
      <SignedIn>
        <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
          <div className="flex flex-col items-center gap-8 mb-8">
            <img 
              src='./logo.png'
              width={200}
            />
            <h1 className="text-3xl font-semibold text-center text-gray-900">
              Create your shopping list
            </h1>
          </div>
          {renderState()}
        </main>
      </SignedIn>
    </>
  );
}
