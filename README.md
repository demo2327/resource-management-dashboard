# Resource Management Dashboard

A React-based web application for managing and monitoring various resources, with a focus on AWS infrastructure components. Built with Material UI and featuring a responsive, widget-based layout system.

## Features

- Modern, responsive Material UI design
- Collapsible navigation sidebar
- Draggable and resizable widgets
- Persistent widget layouts
- AWS resource inventory management
- Modular page structure

## Pages

- Entry Page
- App Info
- Platform Info
- AWS Resource Inventory
  - EC2 Instances
  - RDS Clusters
  - S3 Buckets
  - VPCs
  - ECS

## Technology Stack

- React
- TypeScript
- Material UI
- React Grid Layout
- React Router

## Getting Started

1. Clone the repository
```bash
git clone git@github.com:demo2327/resource-management-dashboard.git
cd resource-management-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Project Structure

- `/src`
  - `/components` - Reusable UI components
  - `/pages` - Page components
  - `/hooks` - Custom React hooks
  - `/aws` - AWS resource-specific components

## Development Setup

### SSH Configuration
This repository is configured to use SSH for Git operations. To set up SSH access:

1. Generate an SSH key pair if you haven't already:
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

2. Add your SSH public key to GitHub:
   - Copy the contents of `~/.ssh/id_ed25519.pub`
   - Add it to your GitHub account at https://github.com/settings/ssh/new

3. Clone using SSH URL:
```bash
git clone git@github.com:demo2327/resource-management-dashboard.git
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
