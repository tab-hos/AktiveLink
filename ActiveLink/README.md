# ActiveLink Finland

A modern web application for ActiveLink Finland, a non-profit organization promoting education, social inclusion, and cultural exchange through sports, art, and collaboration.

## Overview

ActiveLink Finland is a React-based web application that provides:

- **Event Management**: Browse and view upcoming events with calendar and list views
- **Training Programs**: Discover and register for training programs
- **Membership**: Join the community through membership applications
- **Newsletter**: Subscribe to stay updated with the latest news

## Project Structure

```
ActiveLink/
├── Components/          # Reusable React components
│   ├── events/         # Event-related components
│   ├── join/           # Membership form components
│   └── training/       # Training program components
├── Entities/           # JSON schema definitions for data models
├── Pages/              # Main page components
│   ├── Home.js        # Landing page
│   ├── About.js       # About us page
│   ├── Events.js      # Events listing page
│   ├── Training.js    # Training programs page
│   └── Join.js        # Membership application page
└── Layout.js          # Main layout component with navigation and footer
```

## Features

- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Beautiful animations using Framer Motion
- **Event Calendar**: Interactive calendar view for events
- **Form Handling**: React Hook Form for form validation and submission
- **Routing**: React Router for navigation (requires setup)

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ActiveLink
```

2. Install dependencies:
```bash
npm install
```

or

```bash
yarn install
```

## Required Dependencies

The project uses the following main dependencies:

- `react` - React library
- `react-router-dom` - Routing
- `react-hook-form` - Form handling
- `framer-motion` - Animations
- `lucide-react` - Icons
- `date-fns` - Date formatting
- `@tanstack/react-query` - Data fetching (optional, currently not used)

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Add logo image**:
   Place your logo image at `/public/logo.png`. The logo should be the ActiveLink Finland logo with the interconnected figures design. Supported formats: PNG, JPG, SVG.

3. **Environment setup**:
   The project is configured with Vite, React Router, and Tailwind CSS. All configuration files are already set up.

## Running the Application

### Development Mode

```bash
npm run dev
```

or

```bash
npm start
```

The application will open at `http://localhost:3000` (or the port specified by Vite).

### Production Build

```bash
npm run build
```

This will create an optimized production build in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

This will preview the production build locally.

## API Integration

**Note**: The base44 API integration has been removed. You'll need to implement your own backend API or data source for:

- Event data fetching
- Program data fetching
- Newsletter subscriptions
- Membership applications
- Program registrations

Look for `TODO` comments in the code to identify where API calls need to be implemented.

## Customization

### Brand Colors

The application uses the following brand colors defined in `Layout.js`:
- Primary Blue: `#0a0f2f`
- Accent Yellow: `#f8cb2a`

You can customize these colors throughout the application.

### Entity Schemas

Data models are defined in the `Entities/` directory as JSON schemas:
- `Event.json` - Event structure
- `Program.json` - Training program structure
- `MembershipApplication.json` - Membership form structure
- `NewsletterSubscriber.json` - Newsletter subscription structure
- `ProgramRegistration.json` - Program registration structure

## Development Notes

- The application uses functional components with React Hooks
- Form validation is handled by React Hook Form
- Animations are powered by Framer Motion
- Icons are from Lucide React
- Date formatting uses date-fns

## Browser Support

Modern browsers that support ES6+ features.

## License

[Add your license information here]

## Contact

For questions or support, contact: contact@activelink.fi

