'use client';

import { useRef, useState } from 'react';
import Webcam from 'react-webcam';


export default function CameraCapture() {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  };

  const retake = () => setCapturedImage(null);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-xl md:text-2xl font-semibold tracking-wide text-[#CF9B84]">
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
              {/* Camera */}
              <div className="rounded-lg overflow-hidden border border-[#CF9B84]/25">
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
              </div>

              {/* Controls */}
              <div className="flex md:flex-col gap-3 md:w-48">
                <button
                  onClick={capture}
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
