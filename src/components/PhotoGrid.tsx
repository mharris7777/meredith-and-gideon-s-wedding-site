import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import photo1 from "@/assets/meredith-gideon-020.jpg";
import photo2 from "@/assets/meredith-gideon-017.jpg";
import photo3 from "@/assets/meredith-gideon-006.jpg";
import photo4 from "@/assets/meredith-gideon-001.jpg";
import { usePhotoLightbox, type Photo } from "@/components/PhotoLightbox";

const photos: Photo[] = [
  { src: photo1, alt: "Meredith and Gideon embracing on a garden bench" },
  { src: photo2, alt: "Meredith and Gideon surrounded by garden flowers" },
  { src: photo3, alt: "Meredith and Gideon walking together in black and white" },
  { src: photo4, alt: "Meredith and Gideon beneath autumn leaves" },
];

const PhotoGrid = () => {
  const lightbox = usePhotoLightbox(photos);
  const reduceMotion = useReducedMotion();
  const [viewportRef, carousel] = useEmblaCarousel({ loop: true, align: "center", duration: 70 });
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!carousel) return;
    const update = () => setSelected(carousel.selectedScrollSnap());
    update();
    carousel.on("select", update);
    carousel.on("reInit", update);
    return () => {
      carousel.off("select", update);
      carousel.off("reInit", update);
    };
  }, [carousel]);

  useEffect(() => {
    if (!carousel || !playing || hovered || focused || reduceMotion) return;
    const timer = window.setInterval(() => carousel.scrollNext(), 7000);
    return () => window.clearInterval(timer);
  }, [carousel, playing, hovered, focused, reduceMotion]);

  return (
    <section className="section-padding bg-accent/50" aria-label="Meredith and Gideon's photos" aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div ref={viewportRef} className="overflow-hidden">
          <div className="flex touch-pan-y -ml-4 md:-ml-8">
            {photos.map((photo, index) => (
              <div key={photo.src} className="flex-none min-w-0 basis-[85%] sm:basis-[65%] lg:basis-[48%] pl-4 md:pl-8"
                role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${photos.length}`}>
                <button
                  type="button"
                  onClick={() => { setPlaying(false); lightbox.open(index); }}
                  aria-label={`View larger photo: ${photo.alt}`}
                  className="block w-full aspect-[4/5] overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground/60"
                >
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" draggable={false} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 mt-8">
          <button type="button" onClick={() => carousel?.scrollPrev()} aria-label="Previous gallery photo"
            className="w-11 h-11 rounded-full border border-foreground/40 text-2xl hover:bg-foreground/10">‹</button>
          <span className="overline" aria-live="off">{selected + 1} / {photos.length}</span>
          {!reduceMotion && (
            <button type="button" onClick={() => setPlaying((value) => !value)}
              aria-label={playing ? "Pause photo carousel" : "Play photo carousel"}
              className="btn-ghost text-sm">{playing ? "Pause" : "Play"}</button>
          )}
          <button type="button" onClick={() => carousel?.scrollNext()} aria-label="Next gallery photo"
            className="w-11 h-11 rounded-full border border-foreground/40 text-2xl hover:bg-foreground/10">›</button>
        </div>
      </div>
      {lightbox.element}
    </section>
  );
};

export default PhotoGrid;
