# Employee Evaluation Platform - Design Specification

## Overview

The Employee Evaluation Platform is a single-user web application for tracking employee performance throughout the year and generating AI-powered quarterly/yearly performance reviews. The design emphasizes **clarity, efficiency, and data organization** while maintaining a professional, modern aesthetic suitable for HR/management use.

### Core Design Principles
1. **Data-First Design**: Information hierarchy prioritizes readability and quick scanning
2. **Efficiency**: Minimize clicks for common tasks (adding data, viewing reports)
3. **Professional Trust**: Clean, business-appropriate aesthetic
4. **Progressive Disclosure**: Show relevant info without overwhelming users
5. **Feedback**: Clear visual states for all interactions (loading, success, error)

---

## Design System

### Color Palette

#### Primary Colors (Blue - Professional, Trust)
- **Primary**: `hsl(221.2, 83.2%, 53.3%)` - #3B82F6
  - Used for: Primary buttons, links, active states
- **Primary Foreground**: `hsl(210, 40%, 98%)` - #FFFFFF
  - Text on primary backgrounds

#### Semantic Colors
- **Destructive**: `hsl(0, 84.2%, 60.2%)` - #EF4444
  - Used for: Delete actions, error states
- **Success**: `hsl(142, 76%, 36%)` - #16A34A
  - Used for: Save confirmations, successful operations
- **Warning**: `hsl(38, 92%, 50%)` - #F59E0B
  - Used for: Warnings, important notices

#### Neutral Colors (Gray Scale)
- **Background**: `hsl(0, 0%, 100%)` - #FFFFFF
- **Foreground**: `hsl(222.2, 84%, 4.9%)` - #0F172A
- **Muted**: `hsl(210, 40%, 96.1%)` - #F1F5F9
- **Muted Foreground**: `hsl(215.4, 16.3%, 46.9%)` - #64748B
- **Border**: `hsl(214.3, 31.8%, 91.4%)` - #E2E8F0

#### Accent Colors (Badges)
- **Purple**: Achievements/Performance - `hsl(262, 83%, 58%)`
- **Green**: Teamwork - `hsl(142, 71%, 45%)`
- **Orange**: Attitude - `hsl(32, 95%, 44%)`
- **Blue**: Other categories - `hsl(217, 91%, 60%)`

### Typography

#### Font Family
- **Primary**: System sans-serif (Geist, Inter, SF Pro, Segoe UI)
- **Monospace**: For code/model references (Geist Mono, SF Mono, Consolas)

#### Type Scale
- **Display/Hero**: 2.5rem/40px - Page titles
  - Weight: 700 (Bold)
  - Line height: 1.2
- **Heading 1**: 2rem/32px - Section headers
  - Weight: 600 (Semibold)
  - Line height: 1.3
- **Heading 2**: 1.5rem/24px - Card titles
  - Weight: 600 (Semibold)
  - Line height: 1.4
- **Body Large**: 1.125rem/18px - Emphasized content
  - Weight: 400 (Regular)
  - Line height: 1.5
- **Body**: 1rem/16px - Default text
  - Weight: 400 (Regular)
  - Line height: 1.5
- **Small**: 0.875rem/14px - Secondary text, labels
  - Weight: 400 (Regular)
  - Line height: 1.4
- **X-Small**: 0.75rem/12px - Hints, metadata
  - Weight: 400 (Regular)
  - Line height: 1.3

### Spacing System

8px base unit:
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px

### Border Radius
- **sm**: 4px - Small elements, badges
- **md**: 8px - Cards, buttons (default)
- **lg**: 12px - Large containers, modals

### Shadows
- **sm**: `0 1px 2px 0 rgb(0 0 0 / 0.05)`
- **md**: `0 4px 6px -1px rgb(0 0 0 / 0.1)`
- **lg**: `0 10px 15px -3px rgb(0 0 0 / 0.1)`
- **Focus Ring**: `0 0 0 2px hsl(221.2, 83.2%, 53.3%)`

---

## Components

### Buttons

#### Primary Button
- Background: Primary blue
- Text: White
- Height: 40px (large: 44px)
- Padding: 0 16px
- Border radius: 8px
- Hover: Darken by 10%
- Active: Scale down 98%

#### Secondary/Outline Button
- Background: Transparent
- Border: 1px solid border color
- Text: Foreground
- Hover: Muted background

#### Destructive Button
- Background: Destructive red
- Text: White
- Use sparingly for delete actions

#### Ghost/Icon Button
- Background: Transparent
- Hover: Muted background
- For actions: Edit, Delete, Close

#### Button States
- **Disabled**: 50% opacity, no pointer events
- **Loading**: Spinner (16px) + text dimmed

### Cards

**Structure:**
```
┌─────────────────────────────────┐
│ Card Header (24px padding)      │
│   - Title (20px, semibold)      │
│   - Description (14px, muted)   │
├─────────────────────────────────┤
│ Card Content (24px padding)     │
│   - Form fields, lists, etc.    │
├─────────────────────────────────┤
│ Card Footer (24px padding)      │
│   - Action buttons              │
└─────────────────────────────────┘
```

**Styling:**
- Background: White
- Border: 1px solid border
- Border radius: 12px
- Shadow: sm (hover: md)
- Padding: 24px

### Input Fields

#### Text Input
- Height: 40px
- Padding: 0 12px
- Border: 1px solid border
- Border radius: 8px
- Focus: Blue ring (2px)
- Placeholder: Muted foreground

#### Textarea
- Min height: 80px
- Padding: 8px 12px
- Same border/radius as text input
- Resize: Vertical only

#### Select/Dropdown
- Same styling as text input
- Chevron icon on right
- Dropdown max height: 256px
- Options: 36px height, hover highlight

### Badges

**Variants:**
- **Default**: Primary background, white text
- **Secondary**: Muted background, muted text
- **Outline**: Transparent with border
- **Category Colors**: Different colors for observation categories

**Styling:**
- Height: 24px
- Padding: 0 8px
- Border radius: 12px (pill)
- Font: 12px
- Icon support: 16px, 4px gap

### Tabs

**Structure:**
```
┌─────────────┬─────────────┐
│  Tab 1      │  Tab 2      │  ← Tab List
├─────────────┴─────────────┤
│                           │
│  Tab Content              │
│                           │
└───────────────────────────┘
```

**Styling:**
- **Tab List**: Muted background, 8px border radius
- **Tab Trigger**: 12px padding, 500 font weight
- **Active**: White background, shadow
- **Content**: 16px top margin

### Separators
- Height: 1px
- Color: Border
- Margin: 16px vertical

---

## Page Designs

### 1. Dashboard (Home Page)

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ ← Back to Dashboard            Employee Evaluation      │
│                             Platform                    │
│  Track performance and generate AI-powered reviews     │
│                                          [+ Add Employee]
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │Employee  │  │Employee  │  │Employee  │            │
│  │  Card    │  │  Card    │  │  Card    │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │Employee  │  │Employee  │  │Employee  │            │
│  │  Card    │  │  Card    │  │  Card    │            │
│  └──────────┘  └──────────┘  └──────────┘            │
└─────────────────────────────────────────────────────────┘
```

**Employee Card Design:**
```
┌─────────────────────────────────┐
│ John Doe                        │
│ Software Engineer               │
│                                 │
│ [📄 12 Accomplishments] [👁️ 8  │
│ Observations]                   │
│                                 │
│ [View Details] [Generate Report]│
└─────────────────────────────────┘
```

**Grid System:**
- Mobile: 1 column
- Tablet: 2 columns (≥768px)
- Desktop: 3 columns (≥1024px)

**Empty State:**
- Icon: Users icon (64px, muted)
- Title: "No employees yet" (20px)
- Subtitle: "Get started by adding your first employee"
- Action: "Add Employee" button (primary)

---

### 2. Add Employee Page

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ ← Back to Dashboard                                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Add New Employee                                │   │
│  │ Enter the employee's details to get started     │   │
│  ├─────────────────────────────────────────────────┤   │
│  │                                                 │   │
│  │ Name                                            │   │
│  │ [________________________]                      │   │
│  │                                                 │   │
│  │ Role / Job Title                                │   │
│  │ [________________________]                      │   │
│  │                                                 │   │
│  │              [Cancel] [Create Employee]         │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Form Design:**
- Centered card, max-width: 672px (42rem)
- Labels: 14px, 500 font weight, 8px bottom margin
- Fields: Full width
- Actions: Right-aligned, 8px gap

---

### 3. Employee Detail Page

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ ← Back to Dashboard                                     │
│                                                         │
│ John Doe                                                │
│ Software Engineer                                       │
│                                                         │
│ ┌───────────────┬───────────────┐                       │
│ │ Accomplishments│ Observations │                       │
│ ├───────────────┴───────────────┤                       │
│ │                                   [form content]      │
│ │                                    or list items      │
│ │                                                       │
│ └───────────────────────────────────────────────────────┘
│                                                         │
│                  [Generate Performance Report]          │
└─────────────────────────────────────────────────────────┘
```

**Add Accomplishment Form:**
```
┌─────────────────────────────────────────────────────────┐
│ Add Accomplishment              Record key achievement  │
├─────────────────────────────────────────────────────────┤
│ Description                                             │
│ ┌─────────────────────────────────────────────────┐    │
│ │ Led the Q1 marketing campaign that increased    │    │
│ │ leads by 40%                                   │    │
│ └─────────────────────────────────────────────────┘    │
│                                                         │
│ Period                                                  │
│ [Q1 2024 or Jan-Mar 2024__________________]             │
│                                                         │
│ [Add Accomplishment]                                    │
└─────────────────────────────────────────────────────────┘
```

**Accomplishment List Item:**
```
┌─────────────────────────────────────────────────────────┐
│ Led the Q1 marketing campaign that increased leads by   │
│ 40%                                                     │
│ 📅 Q1 2024                        [✏️] [🗑️]           │
├─────────────────────────────────────────────────────────┤
│ [Next item...]
```

**Edit Mode (Inline):**
```
┌─────────────────────────────────────────────────────────┐
│ Description                                             │
│ ┌─────────────────────────────────────────────────┐    │
│ │ [Edit field content...]                         │    │
│ └─────────────────────────────────────────────────┘    │
│                                                         │
│ Period                                                  │
│ [Q1 2024________________________________]               │
│                                                         │
│ [✓ Save] [✕ Cancel]                                    │
├─────────────────────────────────────────────────────────┤
│ [Next item...]
```

**Observation List Item:**
```
┌─────────────────────────────────────────────────────────┐
│ Showed great leadership during the product launch crisis│
│ [Attitude]                     [✏️] [🗑️]               │
├─────────────────────────────────────────────────────────┤
│ [Next item...]
```

---

### 4. Report Generation Page

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ ← Back to Employee Details                              │
│                                                         │
│ Generate Performance Report                             │
│ John Doe - Software Engineer                            │
│                                                         │
│ ┌─────────┬──────────────┬──────────┐                 │
│ │Period   │ Framework    │ Year     │                 │
│ ├─────────┼──────────────┼──────────┤                 │
│ │[Yearly ▼]│ [OKR       ▼] │ [2025 ▼] │                 │
│ │2025     │              │          │                 │
│ └─────────┴──────────────┴──────────┘                 │
│                                                         │
│ [Generate Report]                                       │
│                                                         │
│ ┌─────────────────────────────────────────────────┐    │
│ │ Performance Review Report                        │    │
│ │ OKR Framework - Yearly 2025                     │    │
│ ├─────────────────────────────────────────────────┤    │
│ │ [Generated report content in markdown]          │    │
│ │                                                 │    │
│ └─────────────────────────────────────────────────┘    │
│                                                         │
│ ┌─────────────────────────────────────────────────┐    │
│ │ Data Summary                                    │    │
│ │ • 12 accomplishments                             │    │
│ │ • 8 observations                                │    │
│ │                                                 │    │
│ │ Make sure Ollama is running...                  │    │
│ └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

**Report Display:**
- Typography optimized for reading
- Headers (H1-H3) properly styled
- Bullet points with left padding
- Code blocks (if any) with monospace font
- Max width: 65ch for readability

---

## User Flows

### Flow 1: Add New Employee
1. Dashboard → Click "Add Employee"
2. Fill in name and role
3. Click "Create Employee"
4. Redirect to employee detail page
5. Success: Visible employee in navigation

### Flow 2: Add Accomplishment
1. Dashboard → Click "View Details" on employee
2. Accomplishments tab is active
3. Fill description and period
4. Click "Add Accomplishment"
5. Success: Appears in history list below

### Flow 3: Edit Accomplishment
1. Employee detail → Click edit (✏️) icon
2. Row transforms to inline edit form
3. Modify fields
4. Click "Save" or "Cancel"
5. Success: List updates, edit mode closes

### Flow 4: Generate Report
1. Employee detail → Click "Generate Performance Report"
2. Select period, framework, year
3. Click "Generate Report"
4. Loading state with spinner
5. Success: Report displays below options
6. Can regenerate with different parameters

---

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: ≥ 1024px

### Mobile Adaptations

**Dashboard:**
- Single column card grid
- Full-width cards
- Stacked action buttons

**Employee Detail:**
- Tabs scroll horizontally if needed
- Forms full width
- Edit/Delete buttons stack vertically

**Report Page:**
- Dropdowns stack vertically
- Report text maintains readability
- Data summary card below report

---

## Interaction Design

### Micro-interactions
1. **Button Press**: Scale 98% (subtle)
2. **Card Hover**: Elevation increase (shadow md)
3. **Input Focus**: Blue ring appears
4. **Loading**: Skeleton screens or spinners
5. **Delete Confirmation**: Native browser dialog
6. **Save Success**: Brief flash or toast

### Loading States
- **Buttons**: Spinner (16px) + "Loading..." text
- **Cards**: Skeleton with pulse animation
- **Report Generation**: Full-page overlay with centered spinner

### Error States
- **Inline errors**: Red text below field (12px)
- **API errors**: Alert card with icon
- **Empty states**: Illustration + action prompt

### Success States
- **Form submission**: Flash success color
- **Delete**: Item fades out, list reorders
- **Report generation**: Confetti or checkmark animation

---

## Accessibility

### Color Contrast
- All text: Minimum 4.5:1 ratio (WCAG AA)
- Large text (18px+): Minimum 3:1 ratio
- Interactive elements: 3:1 ratio

### Keyboard Navigation
- **Tab**: Focus visible (2px blue ring)
- **Enter/Space**: Activate buttons, links
- **Escape**: Close modals, exit edit mode
- **Arrows**: Navigate dropdown options

### Screen Readers
- Semantic HTML (button, nav, main)
- ARIA labels for icon-only buttons
- Live regions for dynamic content
- Form error announcements

### Touch Targets
- Minimum size: 44×44px
- Spacing: 8px between targets

---

## Design Deliverables

### Required Assets
1. **Icon Set**: Lucide React (already included)
   - Primary: Edit2, Trash2, FileText, Calendar, Tag
   - Navigation: ArrowLeft, Plus
   - Status: Check, X, Loader2, AlertCircle

2. **Illustrations** (optional):
   - Empty state: Users icon (64px)
   - Error: AlertCircle icon (48px)
   - Success: CheckCircle icon (48px)

### Design File Structure (Figma)
```
📁 Employee Evaluation Platform
├── 📁 Design System
│   ├── Colors
│   ├── Typography
│   ├── Components
│   └── Spacing
├── 📁 Pages
│   ├── Dashboard
│   ├── Add Employee
│   ├── Employee Detail
│   └── Report Generation
└── 📁 User Flows
    ├── Onboarding
    ├── Data Entry
    └── Report Generation
```

### Component States to Design
Each interactive component needs:
1. Default/Rest
2. Hover
3. Focus
4. Active/Pressed
5. Disabled
6. Loading
7. Error
8. Success (if applicable)

---

## Animation Guidelines

### Timing
- **Fast**: 150ms - Hover states, button presses
- **Medium**: 300ms - Page transitions, modals
- **Slow**: 500ms - Loading sequences, success feedback

### Easing
- **Ease-out**: Elements entering screen
- **Ease-in**: Elements leaving screen
- **Ease-in-out**: Movement across screen

### Motion
- Subtle, purposeful movements
- No bouncing or excessive animation
- Respect user's motion preferences (`prefers-reduced-motion`)

---

## Brand & Tone

### Visual Personality
- Professional, clean, trustworthy
- Modern but not trendy
- Business-appropriate for HR context

### Content Guidelines
- **Headings**: Clear, descriptive
- **Buttons**: Action-oriented ("Add Employee", not "Submit")
- **Errors**: Helpful, specific
- **Empty States**: Encouraging, guiding

---

## Technical Notes for Designers

### Implementation Constraints
- Built with Next.js 15/16 and React
- Uses shadcn/ui component library
- Tailwind CSS for styling
- Dark mode support (future consideration)

### Design Handoff
- Design tokens in CSS variables
- Component props documented in code
- Responsive breakpoints defined in Tailwind config

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Next Steps for Designers

1. **Create Design System** in Figma:
   - Color palette with semantic naming
   - Type scale with line heights
   - Component library with all states

2. **Design Page Layouts**:
   - Start with Dashboard (most important)
   - Employee Detail (complex interactions)
   - Report Generation (data-heavy)

3. **Prototype Interactions**:
   - Edit mode transitions
   - Tab switching
   - Report generation loading state

4. **Document Decisions**:
   - Rationale for layout choices
   - Any deviations from this spec
   - New patterns discovered

5. **Export Assets**:
   - If custom icons needed: SVG format
   - Illustrations: SVG or PNG@2x
   - No font files (using system fonts)

---

## Questions for Designers

1. Should we add a dark mode?
2. Do we need employee avatars/photos?
3. Should accomplishments support file attachments?
4. Do we need a "quick add" from the dashboard?
5. Should reports be exportable (PDF)?
6. Do we need data visualization (charts)?
7. Should there be a templates library for common accomplishments?

---

*Version: 1.0*
*Last Updated: 2025*
*Platform: Employee Evaluation Platform*
