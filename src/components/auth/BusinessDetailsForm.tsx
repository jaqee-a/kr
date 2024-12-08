import { Plus } from 'lucide-react';

interface BusinessDetailsFormProps {
  onSubmit: (data: BusinessFormData) => void;
}

export interface BusinessFormData {
  restaurantName: string;
  phoneNumber: string;
  location: string;
  preferredSuppliers: string[];
}

export function BusinessDetailsForm({ onSubmit }: BusinessDetailsFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      restaurantName: formData.get('restaurantName') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      location: formData.get('location') as string,
      preferredSuppliers: [formData.get('preferredSuppliers') as string],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700 mb-1">
          Restaurant&apos;s name
        </label>
        <input
          id="restaurantName"
          name="restaurantName"
          type="text"
          placeholder="Restaurant name"
          className="w-full p-2 text-black border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          required
        />
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Phone number
        </label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          placeholder="XXXX XXX XXXX"
          className="w-full p-2 text-black border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          required
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          placeholder="Location"
          className="w-full p-2 border text-black border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          required
        />
      </div>

      <button
        type="button"
        className="flex items-center gap-2 text-sm text-emerald-500 hover:text-emerald-600"
      >
        <Plus className="w-4 h-4" />
        Add another business
      </button>

      <div>
        <label htmlFor="preferredSuppliers" className="block text-sm font-medium text-gray-700 mb-1">
          Preferred suppliers
        </label>
        <select
          id="preferredSuppliers"
          name="preferredSuppliers"
          className="w-full p-2 border text-black border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">Select</option>
          <option value="costco">Costco</option>
          <option value="walmart">Walmart</option>
          <option value="wholeFoods">Whole Foods</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-emerald-500 text-white py-3 rounded-md hover:bg-emerald-600 transition-colors"
      >
        Create
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <a href="/auth/login" className="text-emerald-500 hover:text-emerald-600">
          Log in
        </a>
      </p>
    </form>
  );
}
