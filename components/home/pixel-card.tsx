"use client";

export function PixelGrid() {
  const cols = 20;
  const rows = 4;
  const pixels = Array.from({ length: cols * rows });

  return (
    <>
      <style>{`
        @keyframes pixelFade {
          0%, 100% { opacity: 0.1; }
          50%      { opacity: 0.75; }
        }
      `}</style>
      <div
        className="grid w-9/10 gap-0.75 py-2 md:absolute md:mx-auto left-0 right-0 bottom-5"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {pixels.map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-[1px] border border-border"
            style={{
              backgroundColor: "#caec61",
              opacity: 0.05,
              animation: `pixelFade ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 5}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}