'use client';

import Image from 'next/image';

interface OrderConfirmedProps {
  onNewOrder: () => void;
}

export default function OrderConfirmed({ onNewOrder }: OrderConfirmedProps) {
  return (
    <div className="min-h-screen bg-[#EFF5F3] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/logo.png"
            alt="Kitchen Restocker"
            width={150}
            height={150}
            className="mx-auto mb-6"
          />
          <h1 className="text-2xl text-black font-bold mb-2">Order confirmed</h1>
        </div>

        <div className="bg-white rounded-lg p-8 shadow">
          <div className="flex justify-between items-center mb-8">
            <div className="w-24 h-24">
              <Image
                src="/bucket.svg"
                alt="Shopping Bag"
                width={96}
                height={96}
                className="w-full h-full"
              />
            </div>
            <div className="h-1 flex-1 mx-4 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-emerald-500" />
            </div>
            <div className="w-24 h-24">
              <Image
                src="/fs.svg"
                alt="Restaurant"
                width={96}
                height={96}
                className="w-full h-full"
              />
            </div>
          </div>

          <p className="text-center text-gray-600 mb-8">
            Your order is on its way to your restaurant
          </p>

          <div className="flex justify-center">
            <div className='max-w-64 bg-gray-50 p-4 rounded-3xl'>
              <p className="text-sm text-gray-500 mb-4 font-bold">Make another order</p>
              <div className='p-0.5 rounded-[8px] from-emerald-500 to-[#F7A84A] bg-gradient-to-r'>
                <button
                  onClick={onNewOrder}
                  className="inline-flex bg-gray-50 items-center justify-center px-6 py-2 text-black font-bold rounded-[6px] hover:bg-emerald-50 transition-colors"
                >
                  New order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
