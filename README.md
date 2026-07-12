# DEV CITY — GTA V Inspired 3D Developer Portfolio

DEV CITY is a GTA V-inspired 3D portfolio built for full-stack developers. It features a neon city environment inspired by Los Santos, a scroll-controlled camera drive, a custom game-style HUD with a cash counter, mini-map radar and wanted stars, along with mission-based project cards, character-style skill stats and a cinematic trailer section.

Built with **Next.js 15, React 19, React Three Fiber, Three.js, Framer Motion, Tailwind CSS and Lenis**.

## Getting Started

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the project in your browser:

```text
http://localhost:3000
```

## Customizing the Portfolio

Most of the portfolio content is managed from one file:

```text
lib/data.ts
```

Edit the following sections to add your own information:

* `profile` — Name, role, tagline, email, phone number, social links and profile image.
* `hud` — Cash balance displayed in the HUD and the wanted level from 1 to 5 stars.
* `stats` — Technical skills displayed as GTA-style character stat bars. Values range from 0 to 100.
* `missions` — Portfolio projects displayed as mission cards.
* `experience` — Work experience and career history displayed as a heist log timeline.
* `contacts` — Contact and social links displayed inside the in-game phone interface.
* `navItems` — Navigation links displayed in the top menu.

## Adding Your Profile Image

Replace the default file:

```text
public/profile.svg
```

with your own image. For example:

```text
public/profile.jpg
```

Then open `lib/data.ts` and update the `profile.image` value:

```ts
image: "/profile.jpg"
```

Make sure the file name and extension match the image inside the `public` folder.

## Customizing the Camera Movement

The scroll-driven camera path is configured inside:

```text
lib/cameraWaypoints.ts
```

Each portfolio section has its own camera waypoint containing:

* `position` — Defines the camera position in the 3D scene.
* `lookAt` — Defines the point the camera is facing.

You can adjust these values to change the camera route, viewing angles and transitions between sections.

## Project Structure

```text
app/
├── layout.tsx              # Fonts, metadata and root layout
├── page.tsx                # Main page and portfolio sections
└── globals.css             # Global styles and GTA-inspired theme

components/
├── three/
│   ├── CityScene.tsx       # 3D neon city, buildings, lights and traffic
│   └── CameraRig.tsx       # Scroll-controlled camera movement
│
├── LoadingScreen.tsx       # GTA-style loading screen
├── HUD.tsx                 # Game HUD overlay
├── Nav.tsx                 # Pause-menu-inspired navigation
├── Hero.tsx                # Hero section
├── About.tsx               # Developer profile and introduction
├── Skills.tsx              # Character-style skill statistics
├── Projects.tsx            # Mission-based project showcase
├── Experience.tsx          # Career and experience timeline
├── Contact.tsx             # Contact section
└── Footer.tsx              # Website footer

lib/
├── data.ts                 # Main portfolio content and personal details
└── cameraWaypoints.ts      # Camera positions and scroll path
```

## Main Features

* Interactive 3D neon city environment
* Scroll-driven cinematic camera movement
* GTA-inspired loading screen
* Custom HUD with cash balance and wanted stars
* Mini-map-style radar
* Character-style developer statistics
* Mission-based project showcase
* Career and experience timeline
* Cinematic trailer section
* Smooth scrolling
* Responsive design
* Centralized portfolio content configuration

## Tech Stack

* Next.js 15
* React 19
* TypeScript
* React Three Fiber
* Three.js
* Framer Motion
* Tailwind CSS
* Lenis

## Editing Content

Most personal information, projects, skills and links can be updated directly from:

```text
lib/data.ts
```

The main components and 3D scene files only need to be edited when changing the layout, visual design or animation behavior.
