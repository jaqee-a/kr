import { User, FileText } from 'lucide-react';

interface AuthStepProps {
  currentStep: number;
}

export function AuthSteps({ currentStep }: AuthStepProps) {
  const steps = [
    { icon: User, label: 'Create account' },
    { icon: FileText, label: 'Your business details' }
  ];

  return (
    <div className="flex flex-col gap-4 mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index === currentStep;
        const isPast = index < currentStep;

        return (
          <div
            key={step.label}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-emerald-50' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isActive || isPast ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span className={`text-sm ${isActive ? 'text-emerald-500' : 'text-gray-400'}`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
