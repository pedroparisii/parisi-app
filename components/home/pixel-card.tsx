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
        {pixels.map((_, i) => {
          const dur = 3 + ((i * 7) % 40) / 10;   // 3s a ~7s, varia por pixel
          const delay = ((i * 13) % 50) / 10;    // 0s a ~5s
          return (
            <div
              key={i}
              className="aspect-square rounded-[1px] border border-border animate-pixel"
              style={{
                backgroundColor: "#caec61",
                opacity: 0.05,
                animationDuration: `${dur}s`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
    </>
  );
}