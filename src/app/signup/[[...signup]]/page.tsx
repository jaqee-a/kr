'use client';

import { useState } from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthSteps } from '@/components/auth/AuthSteps';
import { BusinessDetailsForm, type BusinessFormData } from '@/components/auth/BusinessDetailsForm';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AccountFormData {
  email: string;
  password: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [accountData, setAccountData] = useState<AccountFormData | null>(null);

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    setAccountData({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
    setCurrentStep(1);
  };

  const handleBusinessSubmit = (data: BusinessFormData) => {
    // Here you would typically send both accountData and businessData to your API
    console.log('Account data:', accountData);
    console.log('Business data:', data);
    
    // Navigate to the main app after successful signup
    router.push('/');
  };

  return (
    <AuthLayout>
      <div className="flex">
        <div className="w-1/3">
          <AuthSteps currentStep={currentStep} />
        </div>
        
        <div className="w-2/3 pl-8">
          {currentStep === 0 ? (
            <>
              <h1 className="text-2xl text-black font-bold mb-8">Create account</h1>
              <form onSubmit={handleAccountSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example: amine@xyz.com"
                    className="w-full p-2 border border-gray-300 text-black rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="w-full p-2 border border-gray-300 text-black rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 text-white py-3 rounded-md hover:bg-emerald-600 transition-colors"
                >
                  Next
                </button>

                <p className="text-center text-sm text-gray-500">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-emerald-500 hover:text-emerald-600">
                    Log in
                  </Link>
                </p>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-8">Your business details</h1>
              <BusinessDetailsForm onSubmit={handleBusinessSubmit} />
            </>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
