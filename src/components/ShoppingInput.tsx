import { useState } from 'react';
import { Sparkles} from 'lucide-react';
import { ImageUploadButton } from './ImageUploadButton';
import { GroceryList } from '@/types';

interface ShoppingInputProps {
  onAdd: (item: GroceryList) => void;
  onFocus: (focused: boolean) => void;
}

export function ShoppingInput({ onAdd, onFocus }: ShoppingInputProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();

    if (input.trim()) {
      form.append('text', input);
    }
    
    Array.from(selectedImages ?? []).forEach((selectedImage) => {
      form.append('files', selectedImage);
    })
    
    const response = await fetch('/api/extract', {
      method: 'POST',
      body: form
    });

    onAdd(await response.json());
    handleFocus(false);
    setInput('');
    setSelectedImages(null);
  };

  const handleFocus = (focused: boolean) => {
    setIsFocused(focused);
    onFocus(focused);
  };

  const handleImageSelect = (files: FileList) => {
    setSelectedImages(files);
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
        {Array.from(selectedImages ?? []).map((selectedImage) => (
          <div className="mt-2 px-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>📎</span>
              <span>{selectedImage.name}</span>
              <button
                type="button"
                onClick={() => setSelectedImages(null)}
                className="text-red-500 hover:text-red-600 ml-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        {isFocused && (
          <div
            className={`absolute bottom-4 right-4 flex gap-2 transition-opacity duration-200`}
          >
              <button
                type="button"
                onClick={() => {
                  setInput('');
                  handleFocus(false);
                  setSelectedImages(null);
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

