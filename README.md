# Meredith and Gideon's Wedding Site

**use this photo as hero image** and use the other screenshot as inspiration
Evermore Wedding - Product Specification

1. Product Overview

Evermore is an elegant wedding announcement website designed for modern couples to share their special day details with loved ones. The site provides essential information including ceremony and reception locations, travel accommodations, and a streamlined RSVP system. Built with Vite, Framer Motion, and Tailwind CSS, the experience emphasizes smooth animations, responsive design, and an intuitive user journey that guides guests from initial announcement through RSVP submission. The design balances sophistication with accessibility, ensuring all guests can easily navigate and respond regardless of device or technical ability.

2. Key Features & Requirements

Index Page - Navigation

Requirements:





Fixed position navigation bar spanning full width



Space-between layout with couple's name on left, RSVP button on right



Smooth fade-in animation on page load



Subtle shadow on scroll to indicate depth



Responsive collapse on mobile with maintained readability

Mock Data:





Couple Name: "Emma & Cooper"



Navigation Button: "RSVP"

Visual Requirements:





Navigation container: bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4 md:px-12 md:py-6 fixed top-0 left-0 right-0 z-50



Couple name: text-lg md:text-xl font-serif tracking-wide text-gray-900



RSVP button: px-6 py-2 bg-rose-600 text-white text-sm font-medium rounded-full hover:bg-rose-700 transition-colors duration-300



Framer Motion: Navigation fades in with initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}



On scroll, add shadow: shadow-md with smooth transition

Index Page - Hero Section

Requirements:





Center-aligned heading group with constrained width



Two-tier heading structure with overline and main title



Large typographic treatment for impact



Breathing room around content



Staggered animation for text elements

Mock Data:





Overline: "Save the Date"



Main Heading: "We're Getting Married"

Visual Requirements:





Section container: pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-24 lg:pb-32 px-6



Grid setup: grid grid-cols-[repeat(18,1fr)] md:grid-cols-[repeat(22,1fr)] lg:grid-cols-[repeat(30,1fr)]



Heading group: col-[2/span_16] md:col-[8/span_8] lg:col-[8/span_16] text-center



Overline: text-sm md:text-base tracking-[0.2em] uppercase text-rose-600 font-medium mb-4 md:mb-6



Main heading: text-5xl md:text-7xl lg:text-[120px] font-serif text-gray-900 leading-[1] tracking-tight



Framer Motion: Overline appears first with initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}, main heading follows with 0.3s delay

Index Page - Hero Image

Requirements:





Full-bleed image with optimal aspect ratio



Responsive image loading with appropriate sizing



Subtle parallax effect on scroll



High-quality presentation without distortion

Mock Data:





Image description: "Romantic engagement photo of couple in golden hour lighting, standing in a field with soft focus background"



Image dimensions: 2400x1600px (3:2 aspect ratio)

Visual Requirements:





Image container: col-[2/span_16] md:col-[3/span_18] lg:col-[3/span_26] my-12 md:my-16 lg:my-24



Image styling: w-full h-auto rounded-2xl shadow-2xl object-cover



Aspect ratio maintained: aspect-[3/2]



Framer Motion: Image scales in with initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}



Parallax effect: Subtle vertical transform on scroll using useScroll and useTransform from Framer Motion

Index Page - Date & Description

Requirements:





Centered content with readable line length



Clear hierarchy between date and description



Detailed event information without overwhelming



Warm, inviting tone in copy

Mock Data:





Date: "June 17, 2025"



Description: "Join us for an evening of celebration as we begin our journey together. The festivities will commence with an intimate garden ceremony at sunset, followed by a reception filled with dinner, dancing, and joy. We kindly request semi-formal attire—garden party chic is encouraged."

Visual Requirements:





Section container: py-16 md:py-24 lg:py-32 px-6



Content group: col-[2/span_16] md:col-[6/span_12] lg:col-[8/span_16] text-center max-w-3xl mx-auto



Date heading: text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-6 md:mb-8



Description text: text-base md:text-lg leading-relaxed text-gray-700 font-light



Framer Motion: Content fades up with initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }}

Index Page - Event Details

Requirements:





Two-column layout for ceremony and reception



Clear visual separation between events



Complete location information for each venue



Prominent RSVP call-to-action below events



Icon or visual indicator for each event type

Mock Data:





Ceremony:





Title: "Ceremony"



Venue: "Riverside Botanical Gardens"



Address: "485 Magnolia Drive, Charleston, SC 29401"



Time: "5:30 PM - 6:15 PM"



Reception:





Title: "Reception"



Venue: "The Charleston Grand Ballroom"



Address: "723 Harbor View Avenue, Charleston, SC 29401"



Time: "7:00 PM - 11:30 PM"

Visual Requirements:





Section container: py-16 md:py-24 bg-gray-50 px-6



List container: col-[2/span_16] md:col-[3/span_18] lg:col-[6/span_20] max-w-6xl mx-auto



Grid layout: grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16



Event card: bg-white rounded-xl p-8 md:p-10 shadow-lg



Event title: text-2xl md:text-3xl font-serif text-gray-900 mb-6 pb-4 border-b border-gray-200



Venue name: text-lg font-medium text-gray-900 mb-2



Address: text-base text-gray-600 mb-3



Time: text-base text-rose-600 font-medium



RSVP CTA: inline-block px-10 py-4 bg-rose-600 text-white text-lg font-medium rounded-full hover:bg-rose-700 transition-all duration-300 hover:scale-105 shadow-lg mx-auto



Framer Motion: Cards stagger in with initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }} viewport={{ once: true }}

Index Page - Travel Section

Requirements:





Clear accommodation information for out-of-town guests



Hotel block details with booking instructions



Clickable link to hotel website



Complete address for navigation

Mock Data:





Description: "We've reserved a block of rooms at The Aurora Grand Hotel in the Historic District. Simply mention the Cooper wedding when booking your reservation to receive our group rate. Rooms are available from June 16-18, 2025."



Hotel Link: "The Aurora Grand Hotel"



Hotel Address: "892 Meeting Street, Charleston, SC 29401"

Visual Requirements:





Section container: py-16 md:py-24 lg:py-32 px-6 bg-white



Content wrapper: col-[2/span_16] md:col-[6/span_12] lg:col-[8/span_16] max-w-3xl mx-auto text-center



Description text: text-base md:text-lg leading-relaxed text-gray-700 mb-6



Hotel link: text-rose-600 font-medium underline decoration-2 underline-offset-4 hover:text-rose-700 transition-colors



Address: text-sm text-gray-500 mt-2



Framer Motion: Section slides in from left with initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-50px" }}

Index Page - Photo Grid

Requirements:





Three-column layout showcasing couple's story



Equal-height images with consistent aspect ratio



Responsive stacking on smaller screens



Hover effects to add interactivity

Mock Data:





Photo 1: "Couple laughing at outdoor café, candid moment with coffee cups"



Photo 2: "Scenic beach sunset proposal scene with silhouettes"



Photo 3: "Cozy indoor portrait with warm fireplace lighting"

Visual Requirements:





Section container: py-16 md:py-24 px-6 bg-gray-50



Grid wrapper: col-[2/span_16] md:col-[3/span_18] lg:col-[3/span_26] max-w-7xl mx-auto



Photo grid: grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8



Image container: aspect-[4/5] rounded-xl overflow-hidden shadow-lg



Image: w-full h-full object-cover transition-transform duration-500 hover:scale-110



Framer Motion: Images cascade in with initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: index * 0.15 }} viewport={{ once: true }}

Index Page - Registry Section

Requirements:





Heartfelt message about couple's preferences



Clear explanation of gift philosophy



Optional registry link



Emphasis on presence over presents

Mock Data:





Section title: "Registry"



Message: "Your love and support mean everything to us. Many of you are traveling from near and far to celebrate with us in Charleston, and your presence is truly the greatest gift. For those who have asked, we've created a small registry for our home together and a fund for our honeymoon adventures. However, please know that your attendance is all we wish for."



CTA text: "View Our Registry"

Visual Requirements:





Section container: py-20 md:py-32 lg:py-40 px-6 bg-white



Content wrapper: col-[2/span_16] md:col-[6/span_12] lg:col-[8/span_16] max-w-3xl mx-auto text-center



Section title: text-sm tracking-[0.2em] uppercase text-rose-600 font-medium mb-6



Message heading: text-3xl md:text-4xl font-serif text-gray-900 mb-8 leading-relaxed



Registry CTA: inline-block px-8 py-3 border-2 border-rose-600 text-rose-600 font-medium rounded-full hover:bg-rose-600 hover:text-white transition-all duration-300



Framer Motion: Content fades in with gentle scale initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}

Index Page - Footer RSVP

Requirements:





Full-viewport covering section for maximum impact



Large, impossible-to-miss RSVP button



Compelling final call-to-action



Smooth transition to RSVP page

Mock Data:





Heading: "Will You Celebrate With Us?"



Button text: "RSVP Now"

Visual Requirements:





Section container: min-h-[60vh] md:min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-rose-50 to-rose-100 px-6 py-20



Content wrapper: text-center max-w-2xl



Heading: text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-12 md:mb-16 leading-tight



RSVP button: inline-block px-16 py-6 bg-rose-600 text-white text-xl md:text-2xl font-medium rounded-full hover:bg-rose-700 transition-all duration-300 hover:scale-105 shadow-2xl



Framer Motion: Heading bounces in with initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, type: "spring", bounce: 0.4 }} viewport={{ once: true }}



Button has hover scale animation and pulse effect on idle

RSVP Page - Header

Requirements:





Welcoming message to set positive tone



Clear RSVP deadline



Explanation of why response is needed



Smooth page load animation

Mock Data:





Main heading: "We Look Forward to Seeing You!"



Deadline text: "Please RSVP by May 1, 2025"



Subtext: "Your response helps us plan an unforgettable celebration"

Visual Requirements:





Section container: pt-32 md:pt-40 pb-12 md:pb-16 px-6 text-center



Heading wrapper: max-w-3xl mx-auto



Main heading: text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6 md:mb-8 leading-tight



Deadline text: text-lg md:text-xl text-rose-600 font-medium mb-3



Subtext: text-base text-gray-600



Framer Motion: Elements cascade down with initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }}

RSVP Page - Form

Requirements:





Clean, accessible form fields



All necessary information collection



Clear field labels and helpful placeholders



Validation states (empty, error, success)



Confirmation message on submission



Progressive disclosure for conditional fields

Mock Data:





Form Fields:





Full Name: "Sarah Johnson"



Email Address: "sarah.johnson@email.com"



Personal Message: "Can't wait to celebrate with you both!"



Attendance: Radio buttons (Joyfully Accepts / Regretfully Declines)



Number of Guests: Dropdown (1, 2, 3, 4, 5+)



Dietary Restrictions: "Vegetarian, no nuts"



Questions/Comments: "What time should we arrive?"



Submit button: "Send RSVP"

Visual Requirements:





Form container: max-w-2xl mx-auto px-6 pb-24



Form card: bg-white rounded-2xl shadow-xl p-8 md:p-12



Field group: mb-6 md:mb-8



Label: block text-sm font-medium text-gray-900 mb-2



Text input: w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all text-gray-900



Textarea: w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all resize-vertical min-h-[120px] text-gray-900



Radio buttons: flex items-center gap-3 mb-3



Radio input: w-5 h-5 text-rose-600 border-gray-300 focus:ring-rose-600



Radio label: text-base text-gray-700 cursor-pointer



Select dropdown: w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all appearance-none bg-white text-gray-900



Submit button: w-full py-4 bg-rose-600 text-white text-lg font-medium rounded-full hover:bg-rose-700 transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed



Error state: border-red-500 focus:ring-red-500



Error message: text-sm text-red-600 mt-1



Success message: bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-center



Framer Motion: Form fields slide in from bottom with initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} viewport={{ once: true }}

3. Design System

Color Palette

Primary Colors:





Rose: #E11D48 (text-rose-600, bg-rose-600)



Dark Rose: #BE123C (text-rose-700, bg-rose-700)



Light Rose: #FFF1F2 (text-rose-50, bg-rose-50)



Pale Rose: #FFE4E6 (text-rose-100, bg-rose-100)

Neutral Colors:





White: #FFFFFF (bg-white)



Off White: #FAFAFA (bg-gray-50)



Light Gray: #F3F4F6 (bg-gray-100)



Medium Gray: #D1D5DB (bg-gray-300)



Text Gray: #4B5563 (text-gray-600)



Dark Gray: #374151 (text-gray-700)



Near Black: #111827 (text-gray-900)

Accent Colors:





Success Green: #10B981 (text-green-800, bg-green-50)



Error Red: #EF4444 (text-red-600, border-red-500)

Typography

Font Families:





Serif (Headings): Playfair Display or similar elegant serif (font-serif)



Sans-serif (Body): Inter or system font stack (font-sans)

Font Sizes:





Extra Small: 0.75rem (12px) - text-xs



Small: 0.875rem (14px) - text-sm



Base: 1rem (16px) - text-base



Large: 1.125rem (18px) - text-lg



Extra Large: 1.25rem (20px) - text-xl



2XL: 1.5rem (24px) - text-2xl



3XL: 1.875rem (30px) - text-3xl



4XL: 2.25rem (36px) - text-4xl



5XL: 3rem (48px) - text-5xl



6XL: 3.75rem (60px) - text-6xl



7XL: 4.5rem (72px) - text-7xl



Custom 120px: Use inline style or custom class for hero

Font Weights:





Light: 300 (font-light)



Normal: 400 (font-normal)



Medium: 500 (font-medium)



Semibold: 600 (font-semibold)



Bold: 700 (font-bold)

Line Heights:





None: 1 (leading-none)



Tight: 1.25 (leading-tight)



Normal: 1.5 (leading-normal)



Relaxed: 1.75 (leading-relaxed)

Letter Spacing:





Normal: 0 (tracking-normal)



Wide: 0.025em (tracking-wide)



Wider: 0.05em (tracking-wider)



Widest: 0.1em (tracking-widest)



Custom 0.2em: tracking-[0.2em] for overline text

Grid System

Breakpoints:





Mobile: < 768px



Tablet: 768px - 1179px (md:)



Desktop: 1180px - 1919px (lg:)



Cinema: ≥ 1920px (xl:)

Grid Configuration:





Mobile: 18 columns (grid-cols-[repeat(18,1fr)])



Tablet: 22 columns (md:grid-cols-[repeat(22,1fr)])



Desktop: 30 columns (lg:grid-cols-[repeat(30,1fr)])



Cinema: 30 columns (xl:grid-cols-[repeat(30,1fr)])

Column Span Patterns:





Content (Standard):





Mobile: col-[2/span_16] (2 → 18)



Tablet: col-[3/span_18] (3 → 21)



Desktop: col-[3/span_19] (3 → 22)



Content (Inset/Narrow):





Mobile: col-[2/span_16] (2 → 18)



Tablet: col-[6/span_12] (6 → 18)



Desktop: lg:col-[8/span_16] (8 → 24)



Content (Full Width):





Mobile: col-[2/span_16] (2 → 18)



Tablet: col-[3/span_18] (3 → 21)



Desktop: lg:col-[3/span_26] (3 → 29)



Content (True Full):





All sizes: col-[1/-1]

Animation Patterns (Framer Motion)

Page Load Animations:





Navigation: Fade down from top with slight y-offset



Initial duration: 0.6s - 0.8s



Easing: ease-out or default easing

Scroll-Triggered Animations:





Sections fade up as they enter viewport



Use whileInView with viewport={{ once: true, margin: "-100px" }}



Stagger children by 0.1s - 0.2s for list items



Progressive disclosure for content-heavy sections

Interactive Animations:





Button hover: Scale to 1.02 - 1.05 with smooth transition



Card hover: Subtle lift with shadow increase



Image hover: Scale to 1.1 with overflow-hidden parent



Link hover: Color transition over 300ms

Micro-interactions:





Form focus: Ring animation appears smoothly



Radio/checkbox: Gentle scale on selection



Success message: Slide down from top with spring bounce



Loading states: Subtle pulse or spinner

Parallax Effects:





Hero image: Subtle vertical movement on scroll



Speed: 0.5x - 0.7x of scroll speed



Use useScroll and useTransform hooks



Apply to large images only, not text

Core Components

Buttons:





Primary Button: px-6 md:px-10 py-3 md:py-4 bg-rose-600 text-white font-medium rounded-full hover:bg-rose-700 transition-all duration-300 hover:scale-105 shadow-lg



Secondary Button: px-6 md:px-8 py-2 md:py-3 border-2 border-rose-600 text-rose-600 font-medium rounded-full hover:bg-rose-600 hover:text-white transition-all duration-300



Text Link: text-rose-600 font-medium underline decoration-2 underline-offset-4 hover:text-rose-700 transition-colors

Cards:





Event Card: bg-white rounded-xl p-8 md:p-10 shadow-lg border border-gray-100



Form Card: bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100



Content Card: bg-white rounded-lg p-6 md:p-8 shadow-md

Form Elements:





Text Input: w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all



Textarea: w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent resize-vertical min-h-[120px]



Radio Button: Custom styled with w-5 h-5 text-rose-600 border-gray-300 focus:ring-rose-600



Select Dropdown: w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 appearance-none bg-white



Label: block text-sm font-medium text-gray-900 mb-2

Images:





Hero Image: w-full aspect-[3/2] rounded-2xl shadow-2xl object-cover



Grid Image: w-full aspect-[4/5] rounded-xl object-cover shadow-lg



Thumbnail: w-full aspect-square rounded-lg object-cover

Navigation:





Fixed Nav: bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4 fixed top-0 left-0 right-0 z-50



Nav Items: Flex layout with space-between



Scroll State: Add shadow-md when scrolled

Sections:





Standard Padding: py-16 md:py-24 lg:py-32 px-6



Reduced Padding: py-12 md:py-16 lg:py-20 px-6



Large Padding: py-20 md:py-32 lg:py-40 px-6

Responsive Behavior

Layout Adaptations:





Mobile (< 768px):





Single column layouts



Stacked navigation if needed



Full-width images with mobile-optimized aspect ratios



Reduced typography scale



Generous tap targets (min 44px)



Tablet (768px - 1179px):





Two-column event details



Maintained image aspect ratios



Medium typography scale



Balanced whitespace



Desktop (≥ 1180px):





Full multi-column layouts



Large typography for impact



Generous whitespace



Hover states for all interactive elements



Parallax effects enabled

Component Behavior:





Navigation: Remains fixed across all viewports



Hero text: Font size scales down on mobile but maintains hierarchy



Event cards: Stack vertically on mobile, side-by-side on tablet+



Photo grid: Single column on mobile, 2-column on tablet, 3-column on desktop



Form: Full-width fields on all sizes with consistent padding



Buttons: Maintain minimum size for touch accessibility

Accessibility Considerations

Interactive Elements:





All buttons have :focus-visible states with clear ring indicators



Form inputs include labels and placeholder text



Links have adequate color contrast (WCAG AA minimum)



Interactive elements have minimum size of 44x44px on mobile

Content:





Semantic HTML structure with proper heading hierarchy



Alt text for all images (decorative images use empty alt)



Sufficient color contrast ratios throughout



Readable font sizes (minimum 16px for body text)

Navigation:





Keyboard accessible with logical tab order



Skip to content link for screen readers



ARIA labels where helpful



Focus management for modal/overlay states

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/68d6dd95-f8b0-44e6-bae5-46334abcbad5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
