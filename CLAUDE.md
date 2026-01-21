# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev`
- **Build production bundle**: `npm run build`
- **Start production server**: `npm start`
- **Run linting**: `npm run lint`

## Architecture Overview

This is a Next.js 16 employee evaluation platform that uses:
- **Frontend**: React 19 with client-side rendering, Tailwind CSS, Radix UI components
- **Backend**: Next.js API routes
- **Database**: SQLite via `better-sqlite3` with file-based storage (`data/employee_eval.db`)
- **AI Integration**: Ollama local LLM for generating performance reports

### Key Architecture Patterns

**Data Layer**:
- Database is initialized in `lib/db.ts` - it auto-creates the data directory and executes schema from `lib/schema.sql`
- The database uses foreign key constraints with `ON DELETE CASCADE` - deleting an employee automatically deletes all associated accomplishments and observations
- API routes directly query the database using `better-sqlite3` synchronous API

**API Route Structure**:
- RESTful API routes under `app/api/`
- Standard pattern: `/api/[resource]` for collection operations, `/api/[resource]/[id]` for single-item operations
- Main endpoints: employees, accomplishments, observations, generate-report

**Frontend Pattern**:
- All pages are client-side (`'use client'` directive)
- State management using React `useState` hooks
- Data fetching with native `fetch()` API
- No form library - manual form handling with controlled inputs

**AI Report Generation**:
- `lib/ollama.ts` handles communication with local Ollama instance
- Requires Ollama running on `localhost:11434` with `gemma3:12b-it-qat` model
- Supports 4 evaluation frameworks: OKR, BARS, MBO, Competency
- Supports quarterly and yearly periods with automatic filtering based on timestamps

### Type Definitions

All shared TypeScript types are in `types.ts` at the root:
- `Employee`, `Accomplishment`, `Observation` - core data models
- `EmployeeWithStats` - extends Employee with accomplishment/observation counts
- `Framework` - union type: `'OKR' | 'BARS' | 'MBO' | 'Competency'`
- `ReportPeriod` - union type: `'yearly' | 'Q1' | 'Q2' | 'Q3' | 'Q4'`

### UI Components

- Shadcn/Radix UI components in `components/ui/`
- Material Symbols icons used throughout (via Google Fonts)
- Custom navigation in `components/Navigation.tsx`
- No component library customization beyond basic shadcn setup

### Important Notes

- The database file is created automatically on first run in the `data/` directory
- When working with the API, remember that database operations are synchronous, but API routes are async due to request handling
- Employee deletion requires confirmation with exact name matching (implemented in UI)
- All timestamps use `DATETIME DEFAULT CURRENT_TIMESTAMP` in SQLite
