# Goat Farming Guide Frontend

This directory contains the frontend application for the Goat Farming Guide. The frontend is built using Next.js and React.

## Frontend Structure

- `/components` - Reusable UI components
- `/lib` - Utility functions and API clients
- `/pages` - Next.js pages and routes
- `/styles` - CSS and styling files
- `/public` - Static assets

## Key Features

- Topic browsing and article reading
- Search functionality
- Glossary of terms
- Interactive diagrams and charts
- Responsive design for mobile and desktop

## Pages

- `/` - Home page
- `/topics` - Browse all topics
- `/topics/[topicSlug]` - View articles in a specific topic
- `/topics/[topicSlug]/[articleSlug]` - Read a specific article
- `/search` - Search for content
- `/glossary` - View glossary terms
- `/blogs` - View and manage blog posts
- `/investor` - Information for investors
- `/management` - Health and management information
- `/milking` - Milking guide
- `/milking-stand` - Milking stand instructions
- `/schedule` - Scheduling information

## API Integration

The frontend communicates with the backend API to fetch content and perform searches. API clients are located in the `/lib` directory.

## Styling

The application uses a combination of Tailwind CSS and custom CSS modules for styling.

## Theme Support

The application supports both light and dark themes, which can be toggled by the user.