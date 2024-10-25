import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tenantSchema } from '../../types/tenant';
import type { Tenant } from '../../types/tenant';

const steps = [
  { id: 'organization', title: 'Organization Details' },
  { id: 'branding', title: 'Branding' },
  { id: 'features', title: 'Features' },
  { id: 'review', title: 'Review' },
];

export const TenantSetupWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Tenant>({
    resolver: zodResolver(tenantSchema),
  });

  const onSubmit = (data: Tenant) => {
    console.log('Tenant data:', data);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="max-w-2xl mx-auto">
      <nav aria-label="Progress">
        <ol className="flex items-center">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className={`relative ${
                index < steps.length - 1 ? 'pr-8 sm:pr-20' : ''
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`${
                    index <= currentStep
                      ? 'bg-indigo-600'
                      : 'bg-gray-200'
                  } h-8 w-8 rounded-full flex items-center justify-center`}
                >
                  <span className="text-white">{index + 1}</span>
                </div>
                <span className="ml-4 text-sm font-medium">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute top-4 w-full h-0.5 bg-gray-200" />
              )}
            </li>
          ))}
        </ol>
      </nav>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        {currentStep === 0 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Organization Name
              </label>
              <input
                {...register('name')}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
                Domain
              </label>
              <input
                {...register('domain')}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.domain && (
                <p className="mt-1 text-sm text-red-600">{errors.domain.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Add other step content here */}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Previous
          </button>
          {currentStep === steps.length - 1 ? (
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Complete Setup
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};