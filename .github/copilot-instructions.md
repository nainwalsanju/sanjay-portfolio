# AI Agent Instructions for Portfolio Project

## Project Overview
This is a React-based portfolio website with dark mode support, routing, and particles background effects. The project is structured as a single-page application with multiple routes and components.

## Key Architecture Components
- `BaseLayout.js`: Main layout component managing dark mode and routing
- `components/`: Organized by feature (home, about, portfolio)
- `assets/info/Info.js`: Central configuration file for portfolio content
- `assets/colors/`: Theme configuration files
- `services/`: API integrations
- Styling: SCSS modules for component-specific styles

## Development Workflow

### Setup
```bash
npm install    # Install dependencies
npm start     # Start development server
npm run build # Create production build
```

### Dark Mode Implementation
- Dark mode state is managed in `BaseLayout.js`
- OS preference detection via `window.matchMedia`
- State persisted in localStorage
- Theme colors defined in `assets/colors/mainGradient.js` and `assets/colors/particlesBg.js`

### Adding New Content
1. Portfolio content is centralized in `src/assets/info/Info.js`
2. Images should be placed in `src/assets/img/`
3. New routes should be added to `BaseLayout.js`

## Project Conventions
- Component structure:
  - Each major section has its own directory under `components/`
  - Module-scoped SCSS files named `ComponentName.module.scss`
- Analytics: Use `logGa()` from `utils/log.js` for tracking events
- Styling: Material-UI (`@mui/material`) for layout and basic components
- Meta tags: Edit in `public/index.html` for social media previews

## Key Files to Know
- `/src/assets/info/Info.js`: Main content configuration
- `/src/components/BaseLayout.js`: App structure and routing
- `/src/assets/colors/`: Theme configuration
- `/public/index.html`: Meta tags and SEO configuration

## Common Tasks
- Adding a portfolio item: Update `Info.js` with new project details
- Modifying theme colors: Edit `mainGradient.js` and `particlesBg.js`
- Adding new pages: Create component, add to `BaseLayout.js` routes
- Analytics updates: Configure in `utils/log.js`

## Dependencies
- Material-UI for components
- React Router for navigation
- SASS for styling
- Firebase for analytics
- Particles.js for background effects