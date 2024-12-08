import { Camera } from 'lucide-react';

interface ImageUploadButtonProps {
  onImageSelect: (file: FileList) => void;
}

export function ImageUploadButton({ onImageSelect }: ImageUploadButtonProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.length) {
      onImageSelect(files);
    }
  };

  return (
    <div className="bg-white rounded-lg border-0 shadow-sm h-[50px] w-[50px] grid place-content-center">
      <label className="cursor-pointer group">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
        <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Camera className="w-5 h-5 text-gray-400" />
        </div>
      </label>
    </div>
  );
}
