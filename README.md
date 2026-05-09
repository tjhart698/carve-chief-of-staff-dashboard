# Carve Dashboard

Static GitHub Pages dashboard for Tyler Hart's AI chief-of-staff system.

## What it does
- Shows task counts and agent workload
- Tracks tasks, status, assignments, and next actions
- Lets Tyler use Carve as the single front door
- Stores edits in browser localStorage for simple setup

## Files
- `index.html` — dashboard UI
- `styles.css` — styling
- `app.js` — dashboard logic
- `dashboard-data.json` — seed data
- `org.json` — role structure

## Important limitation
Because this is a static site, task edits are saved in the browser that made them. Shared live state across devices will require a backend or API later.
