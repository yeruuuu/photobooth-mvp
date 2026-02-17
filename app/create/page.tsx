'use client';

import CameraCapture from '@/components/CameraCapture';
import BackgroundRemoval from '@/components/BackgroundRemoval';
import { useState } from 'react';

type Step = 'capture' | 'remove-bg';

export default function CreatePage() {
  const [step, setStep] = useState<Step>('capture');
  const [capturedImage, setCapturedImage] = useState<string>('')

  return (
    <main className="h-[100dvh] overflow-hidden bg-[#660710]">
      <div className="h-full flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-wide text-center text-[#CF9B84]">
            Long-Distance Photo Booth
          </h1>
          <p className="text-center mt-2 mb-6 text-[#CF9B84]/70">
            Two places. One frame.
          </p>

          {step === 'capture' && (
            <CameraCapture
              onCapture={(imageUrl) => {
                setCapturedImage(imageUrl);
                setStep('remove-bg')
             }}
            />
          )}

          {step === 'remove-bg' && (
            <BackgroundRemoval
              imageUrl={capturedImage}
              onComplete={(cutoutUrl) => {
                console.log('Cutout ready:', cutoutUrl);
              }}
              onBack={() => setStep('capture')}
            />
          )}
        </div>
      </div>
    </main>
  );
}
