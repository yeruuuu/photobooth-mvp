'use client'

import { useState } from 'react';
import { removeBackground } from '@imgly/background-removal';

interface BackgroundRemovalProps{
  imageUrl: string;
  onComplete: (cutoutUrl: string) => void;
  onBack: () => void;
}

export default function BackgroundRemoval({
  imageUrl,
  onComplete,
  onBack
}: BackgroundRemovalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cutoutUrl, setCutoutUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRemoveBackground = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const blob = await removeBackground(imageUrl);
      const url = URL.createObjectURL(blob);
      setCutoutUrl(url);
    } catch (err) {
      console.error('Background removal failed:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-xl md:text-2xl font-semibold tracking-wide text-[#CF9B84]">
          Step 2: Remove Background
        </h2>
        <span className="text-xs md:text-sm text-[#CF9B84]/70">
          Best results: plain background • good lighting
        </span>
      </div>

      {/* Wooden frame */}
      <div
        className="
          rounded-2xl p-3 md:p-4 shadow-xl
          border border-[#6F3417]/60
          bg-gradient-to-b from-[#995631] to-[#6F3417]
        "
      >
        {/* Inner matte */}
        <div className="rounded-xl bg-[#0b0b0b] border border-[#CF9B84]/20 p-3 md:p-4">
          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg border border-[#921709]/60 bg-[#660710]/30 px-4 py-3 text-[#CF9B84]">
              {error}
            </div>
          )}

          {/* Two-panel layout */}
          <div className="grid gap-4 md:grid-cols-2 items-start">
            {/* Original (left) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium tracking-wide text-[#CF9B84]/90">
                  Original
                </p>
              </div>

              <div className="rounded-xl overflow-hidden border border-[#CF9B84]/25 bg-black/30">
                <img
                  src={imageUrl}
                  alt="Original"
                  className="w-full h-auto block"
                />
              </div>
            </div>

            {/* Cutout (right) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium tracking-wide text-[#CF9B84]/90">
                  Cutout Preview
                </p>

                {cutoutUrl && (
                  <span className="text-xs text-[#CF9B84]/70">
                    Background removed!
                  </span>
                )}
              </div>

              {/* Preview box (always present to prevent layout shift) */}
              <div className="rounded-xl border border-[#CF9B84]/25 bg-black/30 p-3 md:p-4">
                {cutoutUrl ? (
                  <div className="relative rounded-lg overflow-hidden">
                    {/* Checkerboard */}
                    <div
                      className="absolute inset-0 rounded-lg opacity-80"
                      style={{
                        backgroundImage:
                          'repeating-conic-gradient(#2a2a2a 0% 25%, transparent 0% 50%)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    <img
                      src={cutoutUrl}
                      alt="Cutout"
                      className="relative w-full h-auto block"
                    />
                  </div>
                ) : (
                  <div className="h-[260px] md:h-[320px] flex items-center justify-center rounded-lg border border-dashed border-[#CF9B84]/25">
                    {isProcessing ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#CF9B84]/20 border-b-[#CF9B84]" />
                        <p className="text-sm text-[#CF9B84]/70">
                          Removing background…
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-[#CF9B84]/60 text-center px-6">
                        Your cutout will appear here after processing.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Optional: helper note */}
              {cutoutUrl && (
                <p className="mt-2 text-xs text-[#CF9B84]/60">
                  Next you'll be able to refine edges (erase/restore) before continuing.
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse md:flex-row gap-3 md:justify-between">
            <button
              onClick={onBack}
              disabled={isProcessing}
              className="
                w-full md:w-auto rounded-lg px-6 py-3 font-medium tracking-wide
                bg-transparent hover:bg-white/5 text-[#CF9B84]/80
                border border-[#CF9B84]/20
                transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              Back
            </button>

            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              {!cutoutUrl ? (
                <button
                  onClick={handleRemoveBackground}
                  disabled={isProcessing}
                  className="
                    w-full md:w-auto rounded-lg px-6 py-3 font-medium tracking-wide
                    bg-[#921709] hover:bg-[#660710] text-[#CF9B84]
                    border border-[#CF9B84]/20
                    transition-colors
                    disabled:opacity-60 disabled:cursor-not-allowed
                  "
                >
                  {isProcessing ? 'Processing…' : 'Remove Background'}
                </button>
              ) : (
                <button
                  onClick={() => onComplete(cutoutUrl)}
                  className="
                    w-full md:w-auto rounded-lg px-6 py-3 font-medium tracking-wide
                    bg-[#995631] hover:bg-[#6F3417] text-[#CF9B84]
                    border border-[#CF9B84]/20
                    transition-colors
                  "
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
