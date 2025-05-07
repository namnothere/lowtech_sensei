# LowTech Sensei

A React-based learning platform with a modern UI and dark mode support.

## Features

- Left sidebar navigation for lessons and sections
- Markdown content support
- File upload functionality
- Dark mode support
- Responsive design
- Modern UI with Tailwind CSS and shadcn/ui

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Router
- React Markdown

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

- `src/components/` - React components
- `src/services/` - API services
- `src/types/` - TypeScript type definitions

## API Endpoints

The application expects the following API endpoints:

- `GET /api/lessons` - Get all lessons with their sections
- `GET /api/pages/:pageId` - Get page content
- `POST /api/upload` - Upload files

## Development

The project uses:
- Vite for fast development and building
- Tailwind CSS for styling
- TypeScript for type safety
- React Router for navigation
