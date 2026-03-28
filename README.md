# Printable Habits Tracker

A simple, clean habits tracker that generates printable habit tables. Define your habits, set your date range, and print a beautiful tracker to use offline.

![Preview](public/favicon.svg)

## Features

- **Custom Habits** - Add, remove, and reorder habits with drag-and-drop
- **Empty Columns** - Add blank habit columns to fill in by hand after printing
- **Flexible Date Range** - Set any start and end date for your tracker
- **Multiple Page Sizes** - Support for A4, Letter, A5, and Legal paper sizes
- **RTL Support** - Toggle between LTR and RTL layouts for Arabic and other RTL languages
- **Locale Support** - Date formatting in English and Arabic
- **Print-Ready** - Clean tables with proper page breaks for printing
- **Optional Checkboxes** - Toggle checkbox visibility in cells
- **Persistent Storage** - Habits are saved to localStorage automatically

## How It Works

### 1. Add Your Habits

Enter the habits you want to track in the "Your Habits" section. You can:
- Type a habit name and click "Add"
- Click "Add Empty" to create blank columns you can fill in by hand later
- Drag and drop to reorder habits
- Click the × to remove a habit

### 2. Set Your Date Range

Choose the start and end dates for your tracker. The default is 30 days from today.

### 3. Configure Page Settings

- **Page Size** - Select your paper size (A4, Letter, A5, or Legal)
- **Rows Per Page** - Set how many days appear on each printed page
- **Show Checkboxes** - Toggle empty checkboxes in each cell for manual checking

### 4. Choose Your Layout

- **Locale** - Select date formatting (English or Arabic)
- **Direction** - Toggle between LTR and RTL layouts

### 5. Print

Click the "Print" button to open your browser's print dialog. Each page will contain a clean, self-contained habit table.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ammaralk/printable-habits.git
cd printable-habits

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Tech Stack

- **Vite** - Fast build tool and development server
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **@hello-pangea/dnd** - Drag and drop for habit reordering

## Print Tips

For best results when printing:

1. Use Landscape orientation for more columns
2. Set margins to "Default" or "Minimum"
3. Enable "Background graphics" in print settings for row striping
4. Each table page is self-contained with proper borders

## License

ISC

---

Developed by [Ammar Alakkad](https://github.com/ammaralk)