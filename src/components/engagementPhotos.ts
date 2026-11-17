import type { Photo } from "./PhotoLightbox";
import photo0001_960 from "@/assets/engagement/0001-960.jpg";
import photo0001_1920 from "@/assets/engagement/0001-1920.jpg";
import photo0001_full from "@/assets/engagement/0001-full.jpg";
import photo0020_960 from "@/assets/engagement/0020-960.jpg";
import photo0020_1920 from "@/assets/engagement/0020-1920.jpg";
import photo0020_full from "@/assets/engagement/0020-full.jpg";
import photo0031_960 from "@/assets/engagement/0031-960.jpg";
import photo0031_1920 from "@/assets/engagement/0031-1920.jpg";
import photo0031_full from "@/assets/engagement/0031-full.jpg";
import photo0115_960 from "@/assets/engagement/0115-960.jpg";
import photo0115_1920 from "@/assets/engagement/0115-1920.jpg";
import photo0115_full from "@/assets/engagement/0115-full.jpg";

const photo = (src: string, large: string, fullSrc: string, alt: string): Photo => ({ src, srcSet: `${src} 960w, ${large} 1920w`, fullSrc, alt });

export const galleryPhotos: Photo[] = [
  photo(photo0001_960, photo0001_1920, photo0001_full, "Meredith and Gideon beneath autumn leaves"),
  photo(photo0020_960, photo0020_1920, photo0020_full, "Meredith and Gideon embracing on a garden bench"),
  photo(photo0031_960, photo0031_1920, photo0031_full, "Meredith and Gideon walking beneath sunlit trees"),
  photo(photo0115_960, photo0115_1920, photo0115_full, "Meredith and Gideon standing together among garden flowers"),
];
