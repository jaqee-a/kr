import { useState } from 'react';
import { Modal } from './ui/Modal';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function OrderModal({ isOpen, onClose, onConfirm }: OrderModalProps) {
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center mb-6">
        <div className="w-24 h-24 mx-auto mb-4">
          <img
            src="/bucket.svg"
            alt="Kitchen Restocker"
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-2xl text-black font-bold mb-2">Mostly done</h2>
        <p className="text-black">Please select the address and time of your delivery</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Delivery address
          </label>
          <select
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 text-black rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            required
          >
            <option value="0">Restaurant nº1 address</option>
            {/* Add more address options as needed */}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Delivery date
            </label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 text-black border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery time
            </label>
            <div className="relative">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 text-black border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 text-white py-3 rounded-md hover:bg-emerald-600 transition-colors"
        >
          Confirm
        </button>
      </form>
    </Modal>
  );
}
