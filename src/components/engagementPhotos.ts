import type { Photo } from "./PhotoLightbox";
import photo0155_960 from "@/assets/engagement/0155-960.jpg";
import photo0155_1920 from "@/assets/engagement/0155-1920.jpg";
import photo0155_full from "@/assets/engagement/0155-full.jpg";
import photo0114_960 from "@/assets/engagement/0114-960.jpg";
import photo0114_1920 from "@/assets/engagement/0114-1920.jpg";
import photo0114_full from "@/assets/engagement/0114-full.jpg";
import photo0031_960 from "@/assets/engagement/0031-960.jpg";
import photo0031_1920 from "@/assets/engagement/0031-1920.jpg";
import photo0031_full from "@/assets/engagement/0031-full.jpg";
import photo0147_960 from "@/assets/engagement/0147-960.jpg";
import photo0147_1920 from "@/assets/engagement/0147-1920.jpg";
import photo0147_full from "@/assets/engagement/0147-full.jpg";
import photo0081_960 from "@/assets/engagement/0081-960.jpg";
import photo0081_1920 from "@/assets/engagement/0081-1920.jpg";
import photo0081_full from "@/assets/engagement/0081-full.jpg";

const photo = (src: string, large: string, fullSrc: string, alt: string): Photo => ({ src, srcSet: `${src} 960w, ${large} 1920w`, fullSrc, alt });

export const heroPhoto = photo(photo0155_960, photo0155_1920, photo0155_full, "Meredith and Gideon seated by the lake with the city skyline behind them");
export const galleryPhotos: Photo[] = [
  photo(photo0114_960, photo0114_1920, photo0114_full, "Meredith and Gideon embracing among garden flowers"),
  photo(photo0031_960, photo0031_1920, photo0031_full, "Meredith and Gideon walking beneath sunlit trees"),
  photo(photo0147_960, photo0147_1920, photo0147_full, "Meredith and Gideon embracing beside a stone bridge"),
  photo(photo0081_960, photo0081_1920, photo0081_full, "Meredith and Gideon smiling together by the garden railing"),
];
