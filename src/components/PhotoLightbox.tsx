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
  const photo = index === null ? null : photos[index];
  const many = photos.length > 1;

  useEffect(() => {
    if (index !== null) closeRef.current?.focus();
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background/95 backdrop-blur-md px-4 py-16"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={(event) => {
              stop(event);
              onClose();
            }}
            aria-label="Close photo"
            className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full border border-foreground/40 text-foreground text-2xl leading-none flex items-center justify-center hover:bg-foreground/10 transition-colors"
          >
            ×
          </button>

          {many && (
            <button
              type="button"
              onClick={(event) => {
                stop(event);
                onPrev();
              }}
              aria-label="Previous photo"
              className="absolute left-3 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-foreground/40 text-foreground text-2xl leading-none flex items-center justify-center hover:bg-foreground/10 transition-colors"
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
              className="absolute right-3 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-foreground/40 text-foreground text-2xl leading-none flex items-center justify-center hover:bg-foreground/10 transition-colors"
            >
              ›
            </button>
          )}

          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              onClick={stop}
              className="polaroid-frame inline-block max-w-full"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="block w-auto h-auto object-contain"
                style={{ maxWidth: "min(88vw, 1400px)", maxHeight: "74vh" }}
              />
            </motion.figure>
          </AnimatePresence>

          <div className="flex flex-col items-center gap-2 text-center px-6">
            <figcaption className="text-foreground font-serif text-lg md:text-2xl max-w-3xl">
              {photo.alt}
            </figcaption>
            {many && index !== null && (
              <p className="overline">
                {index + 1} of {photos.length}
              </p>
            )}
          </div>
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
    element: (
      <PhotoLightbox photos={photos} index={index} onClose={close} onPrev={prev} onNext={next} />
    ),
  };
}
