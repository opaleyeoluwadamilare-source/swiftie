# TaylorConnect Frontend

A production-ready, high-performance landing page built with Next.js 14, React 18, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Performance Optimized**: < 1.5s load time target, optimized animations, lazy loading
- **Accessibility First**: WCAG compliant, ARIA labels, keyboard navigation, reduced motion support
- **Mobile-First Design**: Responsive from 320px to 4K, touch-optimized interactions
- **Modern Architecture**: Component-based, reusable hooks, TypeScript throughout
- **Smooth Animations**: Intersection Observer for scroll animations, CSS-based transitions
- **SEO Ready**: Semantic HTML, proper meta tags, structured data ready

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout with fonts and meta
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles with CSS variables
├── components/
│   ├── ui/                 # Reusable UI components
│   │   └── Button.tsx      # Accessible button component
│   ├── sections/           # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Testimonials.tsx
│   │   └── PrivacySection.tsx
│   ├── VisualPath.tsx      # Animated connection path
│   ├── AnimatedCounter.tsx # Number animation component
│   └── LandingPage.tsx     # Main page composition
├── lib/
│   ├── hooks/              # Custom React hooks
│   │   ├── useMountAnimation.ts
│   │   ├── useIntersectionObserver.ts
│   │   └── useReducedMotion.ts
│   └── utils.ts            # Utility functions (cn, etc.)
└── types/                  # TypeScript type definitions
    └── index.ts
```

## 🛠️ Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
npm start
```

## 🎨 Design System

### Colors
- **Purple Dark**: `#2B2D42` - Headlines
- **Purple Gradient**: `#7B2CBF` → `#C77DFF` - CTA buttons
- **Purple Border**: `#E5D5FA` - Borders and accents
- **Gray Medium**: `#6B6B6B` - Body text
- **Gray Light**: `#999999` - Secondary text

### Typography
- **Font**: Inter (Google Fonts)
- **Headline**: 36-48px, bold
- **Body**: 16-20px, regular
- **Small**: 14px, regular

### Spacing
- Uses Tailwind's spacing scale
- Section spacing: 4rem (64px)

## ♿ Accessibility Features

- ✅ Semantic HTML5 elements
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Reduced motion support
- ✅ Screen reader friendly
- ✅ Proper heading hierarchy

## ⚡ Performance Optimizations

- **CSS Variables**: For theming and easy customization
- **Will-Change**: Optimized animation properties
- **Intersection Observer**: Efficient scroll animations
- **React.memo**: Component memoization
- **useCallback**: Event handler optimization
- **Lazy Loading**: Images and below-fold content
- **Font Optimization**: Preconnect and display swap

## 🎭 Animation System

- **Mount Animations**: Staggered fade-ins on page load
- **Scroll Animations**: Intersection Observer triggers
- **Hover States**: Smooth transitions with scale effects
- **Reduced Motion**: Respects user preferences
- **Performance**: CSS transforms, GPU-accelerated

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1024px
- **Large**: 1025px+

## 🔧 Custom Hooks

### `useMountAnimation(delay)`
Handles mount animations with proper timing.

### `useIntersectionObserver(options)`
Observes element intersection for scroll-triggered animations.

### `useReducedMotion()`
Detects and respects user's motion preferences.

## 📦 Dependencies

- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS
- **clsx & tailwind-merge**: Class name utilities

## 🚢 Deployment

The app is ready for deployment on:
- Vercel (recommended)
- Netlify
- Any Node.js hosting

## 📝 Code Quality

- TypeScript strict mode
- ESLint configured
- Component-based architecture
- Reusable hooks and utilities
- Consistent naming conventions
- Performance best practices
