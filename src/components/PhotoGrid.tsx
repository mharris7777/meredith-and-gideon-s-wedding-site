import { useEffect, useRef, useState } from "react";
import { animate, motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import "./PhotoCarousel.css";
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


function OrbitPhoto({ photo, slot, rotation, radius, open }: {
  photo: Photo; slot: number; rotation: MotionValue<number>; radius: number; open: () => void;
}) {
  const radians = useTransform(rotation, (value) => (value + slot * 45) * Math.PI / 180);
  const x = useTransform(radians, (value) => Math.sin(value) * radius);
  const scale = useTransform(radians, (value) => 0.58 + 0.42 * (Math.cos(value) + 1) / 2);
  const zIndex = useTransform(radians, (value) => Math.round((Math.cos(value) + 1) * 50));
  return (
    <motion.div className="orbit-photo" style={{ x, scale, zIndex }}>
      <button type="button" onClick={open} aria-label={`View larger photo: ${photo.alt}`}
        className="block w-full h-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
        <img src={photo.src} alt={photo.alt} draggable={false} className="w-full h-full object-cover" />
      </button>
    </motion.div>
  );
}

const PhotoGrid = () => {
  const lightbox = usePhotoLightbox(photos);
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const stepping = useRef(false);
  const controls = useRef<ReturnType<typeof animate> | null>(null);
  const [radius, setRadius] = useState(360);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const rotation = useMotionValue(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => setRadius(entry.contentRect.width * 0.4));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => controls.current?.stop(), []);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || hovered || focused || lightbox.isOpen || stepping.current || document.hidden) return;
    rotation.set(rotation.get() + Math.min(delta, 50) * 0.009);
  });

  const step = (direction: number) => {
    controls.current?.stop();
    stepping.current = true;
    controls.current = animate(rotation, rotation.get() + direction * 45, {
      duration: reduceMotion ? 0 : 0.8,
      ease: "easeInOut",
      onComplete: () => { stepping.current = false; },
    });
  };

  return (
    <section className="section-padding" aria-label="Meredith and Gideon's photos" aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}>
      <div className="max-w-7xl mx-auto">
        <motion.div ref={stageRef} className="orbit-stage"
          onPanEnd={(_, info) => { if (Math.abs(info.offset.x) > 30) step(info.offset.x > 0 ? 1 : -1); }}>
          {Array.from({ length: 8 }, (_, slot) => (
            <OrbitPhoto key={slot} photo={photos[slot % photos.length]} slot={slot}
              rotation={rotation} radius={radius} open={() => lightbox.open(slot % photos.length)} />
          ))}
        </motion.div>
        <div className="flex items-center justify-center gap-6 mt-6">
          <button type="button" onClick={() => step(-1)} aria-label="Previous gallery photo"
            className="w-11 h-11 rounded-full border border-foreground/40 text-2xl hover:bg-foreground/10">‹</button>
          <button type="button" onClick={() => step(1)} aria-label="Next gallery photo"
            className="w-11 h-11 rounded-full border border-foreground/40 text-2xl hover:bg-foreground/10">›</button>
        </div>
      </div>
      {lightbox.element}
    </section>
  );
};

export default PhotoGrid;
