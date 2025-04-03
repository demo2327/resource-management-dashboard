# Resource Management Dashboard

A React-based web application for managing and monitoring various resources, with a focus on AWS infrastructure components. Built with Material UI and featuring a responsive, widget-based layout system.

## Features

- Modern, responsive Material UI design
- Collapsible navigation sidebar
- Draggable and resizable widgets
- Persistent widget layouts
- AWS resource inventory management
- Modular page structure
- Custom dashboard pages with sharing and importing capabilities

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
- Custom Pages (User-defined dashboards)

## Using Custom Pages

Custom Pages allow you to create personalized dashboards with a variety of widgets. Here's how to use them:

### Creating a Custom Page

1. Click on "Custom Pages" in the sidebar
2. Click "Add New Page"
3. Enter a title for your page
4. Click "Add" to create the page

### Adding Widgets

1. Navigate to your custom page
2. Click the "Add Widget" button in the header
3. Enter a title for the widget
4. Select the widget type:
   - Text Widget: For displaying text content
   - Inventory Widget: For showing inventory data
   - Pie Chart: For visualizing data in a pie chart
   - S3 Buckets: For displaying S3 bucket information
5. Optionally enable "Heart Shape" styling
6. Click "Add" to create the widget

### Customizing Your Page

- Drag widgets to reposition them
- Resize widgets by dragging their edges
- Edit widget titles by clicking on them
- Copy widgets using the copy button
- Delete widgets using the delete button
- Edit the page title by clicking on it

### Sharing Page Configurations

You can share your custom page layouts with others:

1. Click the "Share" button in the page header
2. A dialog will open showing the page configuration in YAML format
3. Copy the YAML configuration
4. Share it with others

### Importing Page Configurations

To recreate a shared page layout:

1. Click "Custom Pages" in the sidebar
2. Click "Add New Page"
3. Select the "Import Configuration" tab
4. Paste the YAML configuration
5. Click "Import" to create the page

The imported page will maintain the same layout and widget configuration as the original, with new unique IDs generated for the widgets.

### Resetting Custom Pages

To reset all custom pages and start fresh:

1. Click the "Reset All" button at the bottom of the sidebar
2. Confirm the action in the dialog

Note: This action cannot be undone and will remove all custom pages and their configurations.

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
