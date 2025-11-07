# Harry Potter BookScope Dashboard (Data Dashboard Part 2)

## Overview

This dashboard explores data from the [OpenLibrary API](https://openlibrary.org) for Harry Potter books.
Part 2 adds interactive data visualizations and an expandable detail view for each book to tell a richer story about publication patterns and authorship in the Harry Potter universe.

## Video Walkthrough

GIF Walkthrough: *(attach your screen recording here)*

Example:
![GIF Walkthrough](link-to-gif-here)

## Features

* Displays real data fetched from OpenLibrary
* Filters books by decade and search keyword
* Two unique charts built with **Recharts**

  * 📊 Books Per Decade (Bar Chart)
  * 📈 Top Authors By Number of Books (Line Chart)
* Click any book to reveal detailed info (publisher + subjects) inline
* Responsive layout and consistent styling
* Inline detail view keeps the same sidebar and layout as dashboard

## Required Features Checklist

* [x] Clicking on an item in the list view displays more details about it
* [x] Detail view includes extra information not shown in dashboard
* [x] The same sidebar/layout is displayed in detail view
* [x] Two unique charts incorporated into the dashboard
* [x] Each chart describes a different aspect of the dataset
* [x] Recharts npm library installed and integrated
* [x] Dynamic interaction showing individual item details

*(Router and URL parameters were simulated using inline detail toggles rather than separate routes.)*

## Stretch Features

* [x] Additional chart insights that explain dataset patterns
* [x] Clean UI with chart titles and contextual summaries
* [x] Animated transitions using Recharts built-in tooltips

## Installation & Setup

```bash
git clone https://github.com/amalick8/Harry-Potter-BookScope-Dashboard-Part2.git
cd Harry-Potter-BookScope-Dashboard-Part2
npm install
npm start
```

## Data Source

[OpenLibrary Search API](https://openlibrary.org/dev/docs/api/search)

## Technologies Used

React | Recharts | JavaScript | HTML | CSS

## Author

Created by Muhammad Ammar Malick for CodePath WEB102 (Project 6 – Week 7)
