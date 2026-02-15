'use client';

import CameraCapture from '@/components/CameraCapture';

export default function CreatePage() {
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

          <CameraCapture />
        </div>
      </div>
    </main>
  );
}
