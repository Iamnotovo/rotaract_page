# Rotaract Club de Barcelona Diagonal Website

A modern React website for the Rotaract Club de Barcelona Diagonal.

## Features

- **Home Page**: Who We Are section with photos, Can I Join Rotaract info, and contact form
- **Projects**: Card grid display with detailed project views (title, photo, description, gallery)
- **Club Sections**: About Us, Meetings, Useful Links, and Members
- **Members**: Photo, name, and role display
- **Admin Panel**: Full CRUD management for projects, members, links, and contact submissions
- **Contact Form**: Saves submissions to admin dashboard
- **Responsive Design**: Modern UI with sidebar navigation

## Setup

Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Then visit `http://localhost:5173`

## Build

Build for production:

```bash
npm run build
```

Output is in the `dist/` folder.

## GitHub Pages

The site is set up to deploy to GitHub Pages when you push to `main`.

1. In your repo go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main`; the workflow will build the React app and deploy it.

The site will be at: `https://<your-username>.github.io/rotaract_page/`

## Admin Access

- Username: `nico`
- Password: `admin12345`

## Project Management

Admins can manage:
- **Projects**: Add/edit/delete with title, photo, description, what was done, what we learned, and gallery photos
- **Members**: Add/edit/delete with photo, name, and role
- **Useful Links**: Add/edit/delete links with descriptions
- **Contact Submissions**: View all contact form submissions

