import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type Photo = { src: string; alt: string };

type LightboxProps = {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const stop = (event: React.MouseEvent) => event.stopPropagation();

function PhotoLightbox({ photos, index, onClose, onPrev, onNext }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");
  const photo = index === null ? null : photos[index];
  const many = photos.length > 1;

  useEffect(() => {
    setZoom(1);
    setZoomOrigin("50% 50%");
    if (index !== null) closeRef.current?.focus();
  }, [index]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || index === null) return;
    const onWheel = (event: WheelEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const frame = target.closest<HTMLElement>("[data-zoom-photo]");
      if (!frame || !viewer.contains(frame)) return;
      event.preventDefault();
      const bounds = frame.getBoundingClientRect();
      const originX = Math.max(0, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100));
      const originY = Math.max(0, Math.min(100, (event.clientY - bounds.top) / bounds.height * 100));
      setZoomOrigin(`${originX}% ${originY}%`);
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? bounds.height : 1);
      setZoom((current) => Math.max(1, Math.min(4, current * Math.exp(-delta * 0.002))));
    };
    viewer.addEventListener("wheel", onWheel, { passive: false });
    return () => viewer.removeEventListener("wheel", onWheel);
  }, [index]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label={photo.alt}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-md"
        >
          <div className="flex items-start justify-between gap-4 px-6 md:px-10 pt-6 pb-2">
            <p className="overline pt-3">
              {many && index !== null ? `${index + 1} of ${photos.length}` : ""}
              {zoom > 1 && <span className="ml-3">{Math.round(zoom * 100)}%</span>}
            </p>
            {zoom > 1 && (
              <button type="button" onClick={(event) => { stop(event); setZoom(1); setZoomOrigin("50% 50%"); }}
                className="btn-ghost ml-auto my-3 text-sm" aria-label="Reset photo zoom">
                Reset zoom
              </button>
            )}
            <button
              ref={closeRef}
              type="button"
              onClick={(event) => {
                stop(event);
                onClose();
              }}
              aria-label="Close photo"
              className="w-12 h-12 shrink-0 rounded-full border border-foreground/40 text-foreground text-2xl leading-none flex items-center justify-center hover:bg-foreground/10 transition-colors"
            >
              ×
            </button>
          </div>

          <div ref={viewerRef} className="flex-1 min-h-0 flex items-center justify-center px-14 md:px-24 pb-2">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                onClick={stop}
                className="polaroid-frame inline-block min-w-0 max-w-full"
              >
                <div data-zoom-photo className="overflow-hidden" onDoubleClick={() => { setZoom(1); setZoomOrigin("50% 50%"); }}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="block w-auto h-auto max-w-[calc(100vw-9rem)] md:max-w-[min(1500px,calc(100vw-14rem))] object-contain"
                  style={{ maxHeight: "calc(100dvh - 210px)", transform: `scale(${zoom})`, transformOrigin: zoomOrigin }}
                />
                </div>
              </motion.figure>
            </AnimatePresence>
          </div>

          {many && (
            <button
              type="button"
              onClick={(event) => {
                stop(event);
                onPrev();
              }}
              aria-label="Previous photo"
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-foreground/40 text-foreground text-2xl leading-none flex items-center justify-center hover:bg-foreground/10 transition-colors"
            >
              ‹
            </button>
          )}

          {many && (
            <button
              type="button"
              onClick={(event) => {
                stop(event);
                onNext();
              }}
              aria-label="Next photo"
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-foreground/40 text-foreground text-2xl leading-none flex items-center justify-center hover:bg-foreground/10 transition-colors"
            >
              ›
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function usePhotoLightbox(photos: Photo[]) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((current) => (current === null ? current : (current + 1) % photos.length)),
    [photos.length],
  );
  const prev = useCallback(
    () =>
      setIndex((current) =>
        current === null ? current : (current - 1 + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") next();
      else if (event.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [index, close, next, prev]);

  return {
    open: setIndex,
    isOpen: index !== null,
    element: (
      <PhotoLightbox photos={photos} index={index} onClose={close} onPrev={prev} onNext={next} />
    ),
  };
}
