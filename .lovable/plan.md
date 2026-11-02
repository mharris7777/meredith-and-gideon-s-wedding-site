

# Design Polish Refinements

Comparing your current site to the reference (book.stevejobsarchive.com), the overall structure and aesthetic are already strong. These refinements focus on subtle details that elevate the experience from "good" to "premium editorial."

## What Changes

### 1. Polaroid Frame -- More Authentic
- Increase the bottom padding of the polaroid to be noticeably larger than the sides (like a real instant photo)
- Add a very subtle 1-2 degree rotation for a casual, hand-placed feel
- Soften the shadow to feel more natural (less harsh drop shadow, more diffused)

### 2. Hero Typography -- Bolder Presence
- Increase the "We're Getting Married" heading size on desktop (from `lg:text-4xl` to `lg:text-5xl`)
- Bump the "Emma & Cooper" italic subtitle slightly larger
- Add more vertical breathing room between the polaroid and the text below

### 3. Body Text -- Refined Readability
- Slightly increase the max-width of `.content-left` from `max-w-2xl` to `max-w-3xl` so text lines are longer and more magazine-like (matching the reference's wider text column)
- Fine-tune body text color to be slightly brighter against the gray for better contrast

### 4. Navigation -- More Minimal
- Make the nav background fully transparent with just a subtle blur (no visible background tint), matching the reference's nearly invisible top bar
- Reduce nav padding slightly for a more delicate presence

### 5. Animations -- Slower, More Cinematic
- Slow down scroll-triggered animations from 0.6-0.8s to 1.0-1.2s for a more luxurious feel
- Add slightly longer delays between staggered elements
- Make the hero entrance animation slower (1.6-2.0s) for a dramatic reveal

### 6. Section Transitions -- Seamless Flow
- Remove any remaining visual separators between sections
- Ensure the photo grid images have no rounded corners (the reference uses sharp edges for a more editorial look)
- Increase spacing around the photo grid section

### 7. RSVP and Sub-Pages -- Consistent Editorial Treatment
- Remove the white card background from the RSVP form -- instead, style form inputs with transparent backgrounds and bottom-border-only styling against the gray
- Apply the same editorial spacing to Hotel and Registry pages
- Remove card-based layouts from sub-pages where possible

### 8. Footer CTA -- More Dramatic
- Increase the "Will You Celebrate With Us?" section padding even further
- Make the RSVP button more refined (thinner border, more letter-spacing)

---

## Technical Details

**Files to modify:**

- `src/index.css` -- Update `.polaroid-frame` padding (larger bottom), `.content-left` max-width, `.body-text` color, `.form-input` to use transparent/border-bottom style, animation timing
- `src/components/HeroSection.tsx` -- Larger heading sizes, subtle polaroid rotation via inline style or Tailwind `rotate-1`, slower animation durations
- `src/components/Navigation.tsx` -- Transparent background (`bg-transparent`), lighter blur
- `src/components/PhotoGrid.tsx` -- Remove rounded corners from images, slower animations
- `src/components/DateSection.tsx` -- Slower animation (1.2s)
- `src/components/EventDetails.tsx` -- Slower stagger animations
- `src/components/TravelSection.tsx` -- Slower animation
- `src/components/RegistrySection.tsx` -- Slower animation
- `src/components/FooterRSVP.tsx` -- Increase vertical padding, refine button style
- `src/pages/RSVP.tsx` -- Remove card wrapper, style form with transparent inputs and bottom borders
- `src/pages/Hotel.tsx` -- Remove card backgrounds, use editorial layout with continuous gray
- `src/pages/Registry.tsx` -- Remove card grid, use editorial text-based layout

