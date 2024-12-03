import { useState } from 'react';
import { Sparkles} from 'lucide-react';
import { ImageUploadButton } from './ImageUploadButton';
import { generateGroceriesList } from '@/lib/fetch';

interface ShoppingInputProps {
  onAdd: (item: string) => void;
  onFocus: (focused: boolean) => void;
}

export function ShoppingInput({ onAdd, onFocus }: ShoppingInputProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      generateGroceriesList(input).then((data) => console.log(data));
      // onAdd(input.trim());
      handleFocus(false);
      setInput('');
      setSelectedImage(null);
    }
  };

  const handleFocus = (focused: boolean) => {
    setIsFocused(focused);
    onFocus(focused);
  };

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
  };

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`flex w-full items-center gap-2 transition-all duration-200 ${
            isFocused ? 'scale-[1.02]' : ''
          }`}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onClick={() => handleFocus(true)}
            placeholder='Example: "5 egg boxes from Costco"...'
            className={`flex-[1] p-4 pr-12 bg-white rounded-lg resize-none text-gray-800 placeholder-gray-400 border-0 shadow-sm focus:ring-0 overflow-hidden ${isFocused ? 'h-[220px]': 'h-[50px]'} transition-all duration-200`}
            style={{
              fontSize: '16px',
              boxShadow: isFocused
                ? '0 4px 12px rgba(0, 0, 0, 0.1)'
                : '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          />
          {!isFocused &&
          <ImageUploadButton onImageSelect={handleImageSelect} />}
        </div>
        {selectedImage && (
          <div className="mt-2 px-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>📎</span>
              <span>{selectedImage.name}</span>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="text-red-500 hover:text-red-600 ml-2"
              >
                Remove
              </button>
            </div>
          </div>
        )}
        {isFocused && (
          <div
            className={`absolute bottom-4 right-4 flex gap-2 transition-opacity duration-200`}
          >
              <button
                type="button"
                onClick={() => {
                  setInput('');
                  handleFocus(false);
                  setSelectedImage(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 flex items-center gap-2 from-emerald-500 bg-blue-500 bg-gradient-to-r text-white text-sm font-medium rounded-md"
              >
                <Sparkles className="w-4 h-4" />
                Generate list
              </button>
          </div>
        )}
      </form>
    </div>
  );
}

