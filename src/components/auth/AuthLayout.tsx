import Image from 'next/image';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#EFF5F3] flex items-center justify-center p-4">
      <div className="w-[70%] bg-white rounded-2xl shadow-sm p-8">
        <div className="flex justify-end mb-8">
          <Image
            src="/logo.png"
            alt="Kitchen Restocker"
            width={150}
            height={40}
            className="h-10 w-auto"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
