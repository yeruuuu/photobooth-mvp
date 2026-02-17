'use client';

import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import styles from './CameraCapture.module.css';


interface CameraCaptureProps {
  onCapture: (imageUrl: string) => void;
}

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  const startCountdown = useCallback(() => {
    // Don't start if already counting down
    if (countdown !== null) return;

    setCountdown(2); 

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null) return null;

        if (prev === 1) {
          // Countdown reached 0 - take the photo
          clearInterval(interval);

          if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setCapturedImage(imageSrc);
          }

          return null; // Reset countdown
        }

        return prev - 1; // Count down
      });
    }, 1000); // Fires every 1 second
  }, [countdown]);

  const retake = () => {
    setCapturedImage(null);
    setCountdown(null);
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-lg md:text-xl font-semibold tracking-wide text-[#CF9B84]">
          Step 1: Take Your Photo
        </h2>
        <span className="text-xs md:text-sm text-[#CF9B84]/70">
          Tip: face a window • plain background
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
          {!capturedImage ? (
            <div className="grid md:grid-cols-[1fr_auto] gap-4 items-start">
              {/* Camera + countdown overlay */}
              <div className="relative rounded-lg overflow-hidden border border-[#CF9B84]/25">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  mirrored={true}
                  className="w-full h-auto"
                  videoConstraints={{
                    facingMode: 'user',
                  }}
                />

                {/* Countdown number shown on top of camera */}
                {countdown !== null && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span
                      key={countdown} // key change triggers re-animation each number
                      className={`${styles.countPop} text-9xl font-bold text-white`}
                      style={{
                        animation: 'countPop 0.4s ease-out forwards',
                      }}
                    >
                      {countdown}
                    </span>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex md:flex-col gap-3 md:w-48">
                <button
                  onClick={startCountdown}
                  disabled={countdown !== null}
                  className="
                    w-full rounded-lg px-4 py-3 font-medium tracking-wide
                    bg-[#921709] hover:bg-[#660710] text-[#CF9B84]
                    border border-[#CF9B84]/20
                    transition-colors
                  "
                >
                  Capture
                </button>

                <button
                  type="button"
                  className="
                    w-full rounded-lg px-4 py-3 font-medium tracking-wide
                    bg-transparent hover:bg-white/5 text-[#CF9B84]/80
                    border border-[#CF9B84]/20
                    transition-colors
                  "
                >
                  Switch Template
                </button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-[1fr_auto] gap-4 items-start">
              <div className="rounded-lg overflow-hidden border border-[#CF9B84]/25">
                <img src={capturedImage} alt="Captured" className="w-full h-auto" />
              </div>

              <div className="flex md:flex-col gap-3 md:w-48">
                <button
                  onClick={retake}
                  className="
                    w-full rounded-lg px-4 py-3 font-medium tracking-wide
                    bg-transparent hover:bg-white/5 text-[#CF9B84]/80
                    border border-[#CF9B84]/20
                    transition-colors
                  "
                >
                  Retake
                </button>

                <button
                  onClick={() => onCapture(capturedImage)}
                  className="
                    w-full rounded-lg px-4 py-3 font-medium tracking-wide
                    bg-[#995631] hover:bg-[#6F3417] text-[#CF9B84]
                    border border-[#CF9B84]/20
                    transition-colors
                  "
                >
                  Looks Good
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
