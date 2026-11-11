# Lead Generation Dashboard

> **Solves the overhead of complex, bloated CRM setups by providing a lightweight, zero-database dashboard to capture, organize, and track sales leads directly in the browser.**

---

## Overview

The **Lead Generation Dashboard** is a clean, lightweight web application built with vanilla web technologies (HTML, CSS, JavaScript) and a minimal Node.js backend. It offers small businesses and independent sales professionals a simple, fast way to capture prospect inquiries, organize lead stages, and monitor conversion pipelines without requiring external database configuration or heavy frontend frameworks. All data is persisted directly on the client side using the browser's `localStorage`.

---

## Features

- **Lead Ingestion & Management**: Add, update, and manage prospect contact details, inquiry sources, and deal values.
- **Client-Side Persistence**: Stores and retrieves all lead records instantly using browser `localStorage`—no database setup required.
- **Status & Pipeline Tracking**: Categorize leads across key stages (e.g., *New*, *Contacted*, *Qualified*, *Closed*).
- **Search & Filter Controls**: Quickly find and filter prospects by name, company, status, or date.
- **Responsive Dashboard UI**: Fully responsive, clean interface built with pure CSS for seamless desktop and mobile use.
- **Lightweight Backend**: Minimal Node.js server (`server.js`) to serve static assets and handle routing.

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.0.0 or higher)
- [npm](https://www.npmjs.com/)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/lead-gen-dashboard.git
   ```

2. **Navigate into the project directory:**
   ```bash
   cd lead-gen-dashboard
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   *(or run `node server.js`)*

5. **Open the application:**
   Visit [http://localhost:3000](http://localhost:3000) in your web browser.

---

## Project Structure

```text
lead-gen-dashboard/
├── index.html       # Main user interface and dashboard layout
├── style.css        # CSS styles for layout, themes, and responsiveness
├── app.js           # Client-side interactivity, state handling, and localStorage logic
├── server.js        # Node.js server script to serve application files
├── package.json     # Project metadata, dependencies, and execution scripts
└── README.md        # Project documentation
```
