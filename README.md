# JonkersAI Website

This is the official website for JonkersAI, featuring a blog, portfolio, and contact system.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Authentication

The system includes an admin panel accessible at `/admin`. 

### Default Login Credentials
- **Email**: admin@jonkersai.nl
- **Password**: Xander12

> **Important**: You should change this password after your first login for security reasons.

### Admin Access
Users with an email ending in `@jonkersai.nl` automatically have admin privileges.

## Project Structure

- `/src`: Application source code
  - `/components`: Reusable UI components
  - `/contexts`: React context providers
  - `/pages`: Application pages
  - `/lib`: Utility functions and libraries
- `/public`: Static assets
- `/supabase`: Supabase-related files
  - `/migrations`: Database migration files

## Features

- Modern, responsive UI with dark theme
- Blog system with rich text editor
- Contact form with database integration
- Admin panel for content management
- Supabase integration for authentication and database

## Technologies

- React
- TypeScript
- Tailwind CSS
- Supabase (Auth & Database)
- Vite