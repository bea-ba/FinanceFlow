# Product Requirements Document (PRD)
## FinanceFlow - Financial Wellness Companion App
### **COMPLETE & COMPREHENSIVE SPECIFICATION**

---

## 📋 Document Information

**Product Name:** FinanceFlow (or "Finance Flow")  
**Version:** 1.0 - Complete Specification  
**Author:** Product Team  
**Date:** November 16, 2025  
**Target Platform:** Web Application (Lovable)  
**Document Purpose:** Complete UX/UI specification for design and front-end development

---

## 🎯 Executive Summary

This PRD defines the complete user experience and interface requirements for a modern financial wellness application designed to help individuals effortlessly track income, expenses, and bills through intelligent automation and delightful design. This document is specifically structured for **Lovable** to handle all design, UX, and UI implementation. Backend logic, API integrations, and data processing will be developed separately after the design phase is complete.

**Critical Note:** Authentication must be built first and fully before any other feature development begins.

---

## 🎨 CRITICAL DESIGN DIRECTIVE FOR LOVABLE

### **MANDATORY DESIGN FOUNDATION:**

Lovable MUST design this application using the **exact visual language, aesthetic, color palette, spacing, typography, and emotional tone** demonstrated in the reference design files provided by the client. These designs are not suggestions—they represent the **required visual foundation** that the client loves and expects.

**However, Lovable has CREATIVE FREEDOM to:**
- Expand on the design system for screens not explicitly shown in references
- Add delightful micro-interactions and animations that align with the established tone
- Propose additional UI patterns that maintain consistency with the reference aesthetic
- Optimize layouts for different screen sizes while preserving the core visual identity
- Suggest UX improvements that enhance usability without compromising the visual language

**The Golden Rule:** When in doubt, stay faithful to the reference designs. Innovation is encouraged ONLY when it respects and amplifies the established visual direction.

---

## 🔍 Problem Statement

### Current Pain Points

1. **Spreadsheet Fatigue:** Users aged 20–40 find manual financial tracking in spreadsheets tedious, intimidating, and unmotivating
2. **Invoice Chaos:** Monthly bills (utilities, subscriptions, phone) arrive scattered across email and require manual data entry
3. **Lack of Awareness:** Users miss spending anomalies, unusual charges, or budget deviations until it's too late
4. **No Single Source of Truth:** Financial data lives fragmented across email, drives, bank statements, and receipts
5. **Motivation Deficit:** Existing tools feel corporate, cold, or overwhelming—users abandon them within weeks

### Market Opportunity

The financial wellness market is growing rapidly, but most solutions target either extreme budget-conscious users (complex tools) or high-net-worth individuals (wealth management). There's a massive underserved segment: **energetic, ambitious millennials and Gen Z professionals** who want clarity without complexity, automation without rigidity, and insights without judgment.

---

## 👥 Target User Personas

### Primary Persona: "Busy Alex"

**Demographics:**
- Age: 26–35
- Occupation: Mid-level professional (marketing manager, software developer, teacher, designer)
- Income: €25,000–€55,000/year
- Location: Urban/suburban Portugal, Spain, or similar markets
- Tech Savviness: High (uses Gmail, Drive, mobile apps daily)

**Psychographics:**
- Values simplicity, aesthetics, and time-saving tools
- Wants to be "financially responsible" but hates spreadsheets
- Feels mild anxiety about money but isn't in crisis
- Prefers visual dashboards over raw numbers
- Motivated by progress, trends, and gentle nudges (not shame)

**Goals:**
- Understand monthly spending without manual effort
- Catch billing errors or unusual charges quickly
- Save money for specific goals (travel, emergency fund, apartment)
- Feel in control without constant micromanagement

**Frustrations:**
- "I know I should track expenses, but it's so boring"
- "I forget to log cash purchases"
- "I never know if my electricity bill is normal or too high"
- "My financial apps feel like homework"

### Secondary Persona: "Freelancer Sam"

**Demographics:**
- Age: 28–40
- Occupation: Freelancer, gig worker, consultant, small business owner
- Income: Irregular (€1,500–€4,000/month)
- Location: Digital nomad or home-based

**Unique Needs:**
- Track multiple income sources (invoices, gigs, side hustles)
- Identify seasonal income patterns
- Manage irregular expenses (equipment, subscriptions, coworking)
- Export data for tax purposes

---

## 🎨 Complete Visual Design System

### **Color Palette - EXACT SPECIFICATIONS**

#### **Primary Colors: Foundation & Clarity**

**Deep Navy** `#001F3F`
- Usage: Primary text, headings, strong contrast elements
- Purpose: Professional, high-contrast foundation for readability
- Applications: Page titles, navigation labels, important text

**Off-White / Light Background** `#F8F9FA` or `#FAFBFC`
- Usage: Main background color, card backgrounds
- Purpose: Creates a light, airy, breathing feeling
- Applications: Screen backgrounds, modal backgrounds

#### **Secondary Colors: Data & Organization**

**Sky Blue** `#87CEEB`
- Usage: Charts, data visualizations, informational elements
- Purpose: Makes data easy to digest, calming
- Applications: Chart bars, informational cards, secondary icons

**Mint Green** `#98FF98` or `#00D68F` (vibrant mint)
- Usage: Primary action button, positive indicators, success states, income/savings
- Purpose: Action, growth, positivity, completion
- Applications: Primary CTA buttons, progress bars, success messages, floating action button (FAB)
- **CRITICAL:** This is THE signature action color - all primary CTAs MUST use this vibrant mint green

#### **Accent Colors: Action & Insight**

**Coral/Salmon** `#FF7F50`
- Usage: Warnings, important alerts, attention-drawing elements
- Purpose: Guides user action, highlights insights
- Applications: Alert badges, warning notifications, "Get Started" secondary buttons

**Vivid Green (Success/Completion)** `#00E676`
- Usage: Success states, completed goals, positive feedback
- Purpose: Celebration, achievement, confirmation
- Applications: Checkmarks, "Connected" badges, completed goal indicators

**Yellow/Orange (Alerts)** `#FFB020` or `#FFC107`
- Usage: Warning notifications, pending states
- Purpose: Caution without alarm
- Applications: Unusual spending alerts, pending bill notifications

**Blue (Primary Actions - Alternative)** `#4A90E2` or `#5B9BD5`
- Usage: Secondary primary buttons, links, selected states
- Purpose: Trust, reliability, action
- Applications: "Save Changes" buttons, active navigation states, primary CTA alternatives

**Red (Disconnect/Negative)** `#FF5252` or `#E74C3C`
- Usage: Destructive actions, disconnection, errors
- Purpose: Stop, remove, alert
- Applications: "Disconnect" buttons, "Log Out" text, error states

#### **Neutral Colors: Structure & Support**

**Light Gray (Borders/Dividers)** `#E9ECEF` or `#E0E0E0`
- Usage: Borders, dividers, disabled states
- Applications: Input borders, card separators, section dividers

**Medium Gray (Secondary Text)** `#6C757D`
- Usage: Supporting text, metadata, de-emphasized content
- Applications: Subtitles, timestamps, secondary descriptions

**Icon Background Colors (Soft Tints):**
- Mint tint: `#E8F8F5` (for green icons)
- Blue tint: `#E3F2FD` (for blue icons)
- Coral tint: `#FFE8E0` (for alert icons)
- Yellow tint: `#FFF9E6` (for warning icons)
- Purple tint: `#F3E5F5` (for goal/achievement icons)

### **Typography - EXACT SPECIFICATIONS**

**Font Family:** Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif

**Type Scale:**

**Display/Hero Text** (Welcome screens)
- Size: 36px - 48px
- Weight: 600-700 (Semibold to Bold)
- Line Height: 1.2
- Usage: "Your finances, finally freeing."
- Color: Deep Navy `#001F3F`

**H1 - Page Titles**
- Size: 28px - 32px
- Weight: 600 (Semibold)
- Line Height: 1.3
- Usage: "Good morning, Alex", "Upload Documents", "Profile & Settings"
- Color: Deep Navy `#001F3F`

**H2 - Section Headers**
- Size: 20px - 24px
- Weight: 600 (Semibold)
- Line Height: 1.4
- Usage: "Spending Overview", "Upcoming Bills", "Active Goals"
- Color: Deep Navy `#001F3F`

**H3 - Subsection Headers**
- Size: 18px
- Weight: 600 (Semibold)
- Line Height: 1.4
- Usage: "ACCOUNT", "CONNECTED SERVICES", "PREFERENCES"
- Color: Medium Gray `#6C757D` (all caps, letter-spacing: 0.5px)

**Body Text - Regular**
- Size: 16px
- Weight: 400 (Regular)
- Line Height: 1.6
- Usage: Descriptions, explanations, body content
- Color: Deep Navy `#001F3F` or Medium Gray `#6C757D`

**Body Text - Emphasis**
- Size: 16px
- Weight: 500-600 (Medium to Semibold)
- Line Height: 1.6
- Usage: Transaction names, bill names, emphasized content
- Color: Deep Navy `#001F3F`

**Small Text / Metadata**
- Size: 14px
- Weight: 400 (Regular)
- Line Height: 1.5
- Usage: Timestamps, supporting info, "Premium" labels
- Color: Medium Gray `#6C757D`

**Tiny Text / Labels**
- Size: 12px
- Weight: 500 (Medium)
- Line Height: 1.4
- Usage: Input labels, chart labels, category tags
- Color: Medium Gray `#6C757D`

**Large Numbers (Financial Data)**
- Size: 36px - 48px
- Weight: 600-700 (Semibold to Bold)
- Line Height: 1.2
- Usage: "$12,845.50", total balances
- Color: Deep Navy `#001F3F`
- Font variant: Tabular numbers for alignment

**Button Text**
- Size: 16px
- Weight: 600 (Semibold)
- Letter spacing: 0.3px
- Usage: All button labels
- Color: White (on colored buttons) or color of button type

### **Spacing & Layout - EXACT SPECIFICATIONS**

**Base Unit:** 8px (all spacing derives from this)

**Spacing Scale:**
- XXS: 4px (tight spacing, icon margins)
- XS: 8px (default small spacing)
- SM: 12px (compact padding)
- MD: 16px (standard padding, common margins)
- LG: 24px (section spacing, card padding)
- XL: 32px (large section gaps)
- 2XL: 48px (major section dividers)
- 3XL: 64px (page top/bottom margins)

**Card Padding:**
- Small cards (transaction items): 16px
- Medium cards (summary cards, forms): 24px
- Large cards (dashboard main card): 32px

**Container Max Width:**
- Mobile: 100% (with 16px side padding)
- Tablet: 768px
- Desktop: 480px (mobile-first, centered layout)

**Gap Between Elements:**
- List items: 12px - 16px
- Cards in grid: 16px - 24px
- Sections: 32px - 48px

### **Border Radius - EXACT SPECIFICATIONS**

**Standard Radius Values:**
- Small elements (badges, small icons): 6px - 8px
- Input fields: 8px - 12px
- Buttons: 12px - 16px (soft, friendly corners)
- Cards: 16px - 20px (generous rounding)
- Modals: 20px - 24px (top corners especially)
- Avatar/Profile images: 50% (perfect circle) or 12px for square variants
- FAB (Floating Action Button): 50% (perfect circle)

**CRITICAL:** Maintain consistent corner rounding throughout—this creates the "friendly, approachable" feeling

### **Shadows & Elevation - EXACT SPECIFICATIONS**

**Card Shadow (Default):**
```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
```

**Card Shadow (Hover/Focus):**
```css
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
```

**Modal/Overlay Shadow:**
```css
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
```

**FAB (Floating Action Button) Shadow:**
```css
box-shadow: 0 4px 12px rgba(0, 209, 143, 0.3);
```

### **Iconography - EXACT SPECIFICATIONS**

**Icon Style:** Outline/Line icons (not filled, except for special cases)
- Stroke width: 2px
- Rounded corners on strokes
- Consistent size and visual weight

**Icon Sizes:**
- Small (inline with text): 16px - 18px
- Standard (UI elements): 24px
- Large (featured, category icons): 32px - 40px
- Extra large (empty states, illustrations): 48px - 64px

**Icon Backgrounds (for category icons):**
- Circular or rounded-square backgrounds with soft tint colors
- Size: 48px - 56px container, 24px icon inside
- Padding: 12px - 16px around icon

**Icon Library Suggestion:**
- Heroicons (outline variant)
- Feather Icons
- Lucide Icons
- Ensure consistency—use ONE library throughout

### **Buttons - EXACT SPECIFICATIONS**

#### **Primary CTA (Main Action Button)**

**Default State:**
- Background: Mint Green `#00D68F` or `#98FF98`
- Text: Deep Navy `#001F3F` or Black (high contrast)
- Font size: 16px
- Font weight: 600 (Semibold)
- Padding: 16px 24px (vertical, horizontal)
- Border radius: 12px - 16px
- Width: Full-width on mobile, auto on desktop (min-width: 200px)
- Text alignment: Center
- Border: None
- Example: "Create Your Free Account", "Add Transaction", "Choose from Device"

**Pressed State:**
- Background: Darker mint `#00BF7F`
- Slight scale: 0.98 (subtle press effect)

**Disabled State:**
- Background: Light Gray `#E9ECEF`
- Text: Medium Gray `#6C757D`
- Cursor: not-allowed

#### **Secondary CTA (Alternative Primary - Blue)**

**Default State:**
- Background: Blue `#5B9BD5` or `#4A90E2`
- Text: White
- Font size: 16px
- Font weight: 600
- Padding: 16px 24px
- Border radius: 12px - 16px
- Example: "Save Changes"

**Pressed State:**
- Background: Darker blue `#4A7FB5`

#### **Secondary Action Buttons (Outlined)**

**Default State:**
- Background: Transparent or White
- Border: 2px solid Blue `#5B9BD5` or Mint `#00D68F`
- Text: Blue `#5B9BD5` or Mint `#00D68F` (matching border)
- Font size: 16px
- Font weight: 600
- Padding: 14px 24px
- Border radius: 12px - 16px
- Example: "View Details"

**Pressed State:**
- Background: Light blue tint `#E3F2FD` or light mint tint `#E8F8F5`

#### **Tertiary/Text Links**

**Default State:**
- Background: None
- Text: Blue `#5B9BD5` or Mint `#00D68F`
- Font size: 16px
- Font weight: 500-600
- Underline: None (or on hover only)
- Examples: "Cancel", "Learn More", "Sign In"

**Pressed State:**
- Text: Darker shade or background tint

#### **Destructive Buttons**

**Default State:**
- Background: Transparent or light red tint `#FFE8E8`
- Text: Red `#FF5252` or `#E74C3C`
- Border: None or 2px solid Red (if outlined variant)
- Examples: "Disconnect", "Log Out"

#### **Floating Action Button (FAB)**

**Appearance:**
- Shape: Perfect circle
- Size: 56px - 64px diameter
- Background: Mint Green `#00D68F`
- Icon: White, 24px, centered (typically a "+" icon)
- Shadow: `0 4px 12px rgba(0, 209, 143, 0.3)`
- Position: Fixed bottom-right (16px - 24px from edges)

### **Form Inputs - EXACT SPECIFICATIONS**

#### **Text Inputs**

**Default State:**
- Background: White or very light gray `#F8F9FA`
- Border: 1px solid Light Gray `#E9ECEF`
- Border radius: 8px - 12px
- Padding: 12px 16px
- Font size: 16px
- Font weight: 400
- Text color: Deep Navy `#001F3F`
- Placeholder color: Medium Gray `#6C757D`

**Focus State:**
- Border: 2px solid Blue `#5B9BD5` or Mint `#00D68F`
- Background: White
- Outline: None (custom focus ring)

**Error State:**
- Border: 2px solid Red `#FF5252`
- Background: Light red tint `#FFF5F5`

#### **Dropdowns/Select**

**Appearance:**
- Same as text input
- Right-aligned chevron icon `▼` in Medium Gray
- On click: Opens modal or dropdown list

#### **Toggle Switches**

**Default (OFF):**
- Track: Light gray `#E9ECEF`
- Thumb: White, circular
- Size: ~48px width × 24px height

**Active (ON):**
- Track: Blue `#5B9BD5` or Mint `#00D68F`
- Thumb: White, shifted right

#### **Segmented Controls (Tab Switcher)**

**Appearance:**
- Container: Light gray background `#F0F0F0`, rounded 8px
- Selected segment: White background, shadow `0 1px 3px rgba(0,0,0,0.1)`
- Unselected segment: Transparent, gray text
- Font size: 16px, weight 600

### **Cards & Containers - EXACT SPECIFICATIONS**

#### **Standard Card**

**Appearance:**
- Background: White
- Border: None or 1px solid `#E9ECEF` (very subtle)
- Border radius: 16px - 20px
- Padding: 16px - 24px
- Shadow: `0 2px 8px rgba(0, 0, 0, 0.04)`

#### **Elevated Card (Featured)**

**Appearance:**
- Background: White
- Border radius: 20px
- Padding: 24px - 32px
- Shadow: `0 4px 16px rgba(0, 0, 0, 0.08)`

#### **List Item Cards**

**Appearance:**
- Background: White or very light tint (based on category)
- Border radius: 12px - 16px
- Padding: 12px - 16px
- Gap between items: 12px
- Left accent: Optional 4px colored bar (for status indication)

### **Navigation - EXACT SPECIFICATIONS**

#### **Bottom Navigation Bar (Mobile)**

**Appearance:**
- Background: White
- Border top: 1px solid `#E9ECEF`
- Height: 64px - 72px
- Items: 4-5 evenly spaced
- Shadow: `0 -2px 8px rgba(0, 0, 0, 0.04)` (top shadow)

**Navigation Item:**
- Icon: 24px, centered
- Label: 12px, weight 500, centered below icon
- Active state: Icon and text in Mint Green `#00D68F`, subtle background tint
- Inactive state: Icon and text in Medium Gray `#6C757D`

#### **Top Header Bar**

**Appearance:**
- Background: White or Off-white
- Height: 56px - 64px
- Padding: 16px horizontal
- Shadow: None or `0 1px 3px rgba(0, 0, 0, 0.04)` (subtle)

**Elements:**
- Left: Back arrow (if sub-page) or Avatar + Greeting
- Center: Page title (optional)
- Right: Notification bell icon (with badge if alerts)

### **Charts & Data Visualization - EXACT SPECIFICATIONS**

#### **Line Charts (Trend Charts)**

**Style:**
- Line color: Mint Green `#00D68F` or Sky Blue `#87CEEB`
- Line width: 2px - 3px
- Smooth curves (not angular)
- Area fill: Optional gradient from line color to transparent
- Grid lines: Very light gray `#F0F0F0`, minimal
- Axes: Light gray text, 12px

#### **Bar Charts (Category Spending)**

**Style:**
- Bar colors: Mint Green `#00D68F`
- Bar height: Variable based on data
- Bar radius: 4px - 6px rounded tops
- Background track: Light gray `#E9ECEF`, full width
- Labels: 14px, medium gray
- Values: 14px, deep navy (aligned right)

#### **Progress Bars (Goal Tracking)**

**Style:**
- Track: Light gray `#E9ECEF`, 8px - 12px height
- Fill: Mint Green `#00D68F` (or category-specific color)
- Border radius: 20px (pill-shaped)
- Percentage: Displayed at right, 16px weight 600

### **Modals & Overlays - EXACT SPECIFICATIONS**

#### **Bottom Sheet Modal (Primary Pattern)**

**Appearance:**
- Slides up from bottom
- Background: White
- Border radius: 24px (top corners only)
- Handle: Optional 40px × 4px gray bar at top center
- Padding: 24px - 32px
- Shadow: `0 -4px 16px rgba(0, 0, 0, 0.1)`
- Max height: 90vh (scrollable content)

**Animation:**
- Slide up: 300ms ease-out
- Overlay: Fade in 200ms, dark overlay `rgba(0, 0, 0, 0.5)`

#### **Center Modal (Alternative)**

**Appearance:**
- Centered on screen
- Background: White
- Border radius: 20px
- Padding: 32px
- Max width: 400px - 480px
- Shadow: `0 8px 32px rgba(0, 0, 0, 0.12)`

### **Empty States - EXACT SPECIFICATIONS**

**Layout:**
- Centered content
- Icon/Illustration: 64px - 96px, in light gray or tinted color
- Heading: 20px - 24px, weight 600
- Subtext: 16px, weight 400
- Spacing: 16px - 24px between elements

**Tone:** Friendly, positive, never punishing

### **Animations & Micro-interactions - SPECIFICATIONS**

**Transition Timing:**
- Fast actions: 150ms - 200ms (hover, button press)
- Medium actions: 250ms - 300ms (modal open, page transition)
- Slow actions: 400ms - 500ms (only for major state changes)

**Easing Functions:**
- Default: `ease-in-out`
- Entry: `ease-out`
- Exit: `ease-in`

**Micro-interactions:**
- Button press: Scale 0.98, 150ms
- Card hover: Lift shadow, 200ms
- Toggle switch: Thumb slide, 250ms
- FAB click: Ripple effect, 300ms
- Page transition: Fade or slide, 300ms

---

## 🎨 Product Vision & Principles

### Vision Statement

*"Make personal finance feel like progress, not punishment. Turn financial awareness into a daily habit that's as easy as checking Instagram and as motivating as tracking a workout."*

### Core UX Principles

1. **Breezy & Light:** Interface feels airy, welcoming, never overwhelming
2. **Visual-First:** Charts, colors, and icons over tables and text
3. **Automated by Default:** User does minimal work; app does the heavy lifting
4. **Motivating, Not Shaming:** Celebrate wins, gently flag issues without judgment
5. **Mobile-First Mindset:** Even on web, design for thumb-friendly, scannable layouts
6. **Transparent & Trustworthy:** Always explain what's happening with user data
7. **Progressive Disclosure:** Show simple overview first, details on demand

### Design Language & Emotional Tone

**Mood Board Keywords:** Calm, clear, energizing, modern, approachable, trustworthy, human

**The app must feel like:**
- **A breath of fresh air** (light backgrounds, generous spacing, soft colors)
- **A supportive friend** (encouraging language, motivating insights, gentle alerts)
- **A clear window** (organized data, visual hierarchy, scannable layouts)
- **A moment of calm** (no stress, no shame, no pressure—just clarity)

**NOT like:**
- A corporate banking app (cold, serious, intimidating)
- A game (overly playful, childish, not credible)
- A spreadsheet (dense, overwhelming, technical)
- A cluttered dashboard (busy, confusing, exhausting)

---

## 🚀 Product Goals & Success Metrics

### Business Goals

1. Achieve 10,000+ monthly active users within 6 months of launch
2. Convert 15% of free users to premium within 90 days
3. Maintain 60%+ 30-day retention rate
4. Generate positive word-of-mouth (NPS >50)

### User Goals

1. Reduce time spent on financial tracking by 80%
2. Increase financial awareness (user can answer "How much did I spend last month?" within 5 seconds)
3. Help users identify at least one cost-saving opportunity per quarter
4. Make financial tracking a stress-free, even enjoyable, habit

---

## 📦 Feature Requirements

### 🔐 **PHASE 0: AUTHENTICATION (MANDATORY FIRST STEP)**

**Priority:** P0 (Must build before any other feature)  
**Rationale:** Security, data privacy, and user identity are foundational. No other feature can function without authenticated users.

#### Authentication Screens & Flows

**Screen 1: Welcome / Landing Page**

**VISUAL REFERENCE:** "Your finances, finally freeing." screen

**Layout:**
- Background: Off-white `#F8F9FA` or light gradient (very subtle)
- Vertical centering of content
- Top: Optional logo or app name (small, 20px)
- Hero text: 
  - Main: "Your finances, finally freeing." (36px - 48px, bold, deep navy)
  - Sub: "Effortlessly track spending, visualize your growth, and manage receipts from Google Drive. Take control with your personal finance assistant." (16px, regular, medium gray)
- Primary CTA: "Create Your Free Account" (full-width, mint green `#00D68F`, 16px padding, 12-16px radius)
- Secondary link: "Already have an account? Sign In" (16px, blue `#5B9BD5` link, centered below button)
- Spacing: 24px between text sections, 32px before button

**Visual Tone:** Calm, spacious, confident, welcoming

**UX Requirements:**
- Welcoming, confident, modern aesthetic
- Fast-loading, no clutter
- Clear differentiation between sign-up and log-in
- Optional: Short animated illustration showing app in action

**Screen 2: Sign-Up Flow**

- **Method Options:**
  - Google OAuth (primary, one-click)
  - Email + Password (fallback)
  - Optional: Apple Sign-In (if feasible)

- **Email Sign-Up Steps:**
  1. Email input with real-time validation
  2. Password input with strength indicator (visual bar: weak → strong)
  3. Confirm password
  4. Optional: Name input (first name only, friendly)
  5. Terms & Privacy checkbox (required)
  6. "Create Account" button (mint green, full-width)

- **UX Requirements:**
  - Single-column layout, clean and focused
  - Inline error messages (gentle, helpful)
  - Password requirements visible (e.g., "At least 8 characters, 1 number")
  - Loading state on button click
  - Success message before redirect

**Screen 3: Log-In Flow**

- **Inputs:**
  - Email
  - Password
  - "Remember me" checkbox
  - "Forgot password?" link (prominent but secondary, blue link)

- **UX Requirements:**
  - Autofill-friendly
  - Show/hide password toggle (eye icon)
  - Clear error messaging ("Email or password incorrect")
  - Smooth transition to main app on success

**Screen 4: Password Reset Flow**

- **Step 1:** Email input → "Send reset link" button (mint green)
- **Step 2:** Confirmation message ("Check your inbox for reset instructions")
- **Step 3:** Reset link leads to new password form (2 fields: New Password, Confirm Password)
- **Step 4:** Success message → Redirect to log-in

**Screen 5: Email Verification (if applicable)**

- **Post-Sign-Up:** User receives verification email
- **UI State:** "Please verify your email" banner on dashboard until verified
- **Resend Option:** "Didn't receive email? Resend"

**Screen 6: Onboarding Permissions (Post-Authentication)**

- **After First Login:** User is guided to grant optional permissions:
  - Google Drive access (for invoice import)
  - Email access (for bill scanning)
  - Notification permissions (for alerts)

- **UX Requirements:**
  - Explain why each permission is valuable ("We'll find your bills automatically so you don't have to")
  - Allow skipping (user can enable later in settings)
  - Visual illustrations showing what happens with each permission
  - "Allow" (mint green) and "Skip for now" (outlined) buttons

#### Acceptance Criteria for Authentication

- [ ] User can sign up with Google in <3 clicks
- [ ] User can sign up with email + password with clear validation
- [ ] User can log in with saved credentials (autofill works)
- [ ] User can reset password via email link
- [ ] User receives confirmation email after sign-up
- [ ] User cannot access main app without authentication
- [ ] All authentication states are visually clear (loading, success, error)
- [ ] Error messages are friendly and actionable
- [ ] Password strength is visually indicated during sign-up
- [ ] "Forgot password" flow is intuitive and quick
- [ ] Post-login onboarding is skippable but encouraged
- [ ] Design matches reference examples in tone and polish

---

### 🏠 **PHASE 1: CORE APP STRUCTURE**

#### Navigation System

**Top-Level Navigation (Primary):**

1. **Dashboard** (Home icon) — Default landing after login
2. **Income** (Trending-up icon) — Salary tracking and history
3. **Bills** (Receipt icon) — Recurring monthly bills
4. **Spending** (Credit-card icon) — Manual expenses and scans
5. **Insights** (Chart icon) — Trends, anomalies, analysis
6. **Profile/Settings** (User icon) — Account, preferences, export, premium

**Navigation UX:**
- Bottom navigation bar on mobile-first layouts (persistent, always visible)
- 4-5 items: Dashboard, Analysis, Accounts, Settings
- Active state: Mint green `#00D68F` icon + text
- Inactive state: Medium gray `#6C757D`
- Height: 64px-72px
- White background, top border `#E9ECEF`, top shadow
- Badge notifications for alerts (e.g., "3 new bills")

#### Empty States (All Features)

**Required Empty State Screens:**

- **Dashboard (First Login):** 
  - Icon: 64px illustration
  - Heading: "Welcome! Let's get started." (24px, semibold)
  - Subtext: "Connect your email or Drive to import bills automatically, or add your first expense manually."
  - CTA buttons: "Connect Drive" (mint) + "Add Expense" (outlined)

- **Income (No Data):** 
  - Icon: Money/income illustration
  - Heading: "No income tracked yet"
  - Subtext: "Add your first salary invoice or connect Drive to import automatically."
  - CTA: "Add Income" (mint green)

- **Bills (No Data):** 
  - Icon: Receipt illustration
  - Heading: "No bills yet"
  - Subtext: "Connect your email to scan for recurring payments."
  - CTA: "Connect Email" (mint green)

- **Spending (No Data):** 
  - Icon: Wallet illustration
  - Heading: "Start tracking expenses"
  - Subtext: "Track your first expense by snapping a photo or typing it in."
  - CTAs: "Scan Bill" + "Add Manually"

- **Insights (No Data):** 
  - Icon: Chart illustration
  - Heading: "Insights coming soon"
  - Subtext: "We'll show you insights once you have at least one month of data."
  - No CTA (passive state)

**UX Principles for Empty States:**
- Never show blank screens
- Always offer 2–3 clear next actions
- Use encouraging, friendly language
- Include relevant illustration or icon (64px-96px)
- Design should feel spacious, not cluttered
- Centered content with generous spacing

---

### 📊 **PHASE 2: DASHBOARD (HOME SCREEN)**

**VISUAL REFERENCE:** "Good morning, Alex" screen

**Purpose:** High-level financial snapshot at a glance. The user's "home base."

#### Screen Layout

**Header:**
- Avatar (40px circle, coral `#FF7F50` background) + Greeting "Good morning, Alex" (18px, weight 600, deep navy)
- Notification bell icon (24px, right-aligned, badge if alerts)
- White background, 56px-64px height, 16px horizontal padding

**Section 1: Total Balance Card (Featured)**

- **Visual Style:**
  - White card with elevated shadow `0 4px 16px rgba(0, 0, 0, 0.08)`
  - Border radius: 20px
  - Padding: 32px
  - Margin bottom: 24px

- **Content:**
  - Label: "Total Balance" (14px, medium gray)
  - Amount: "$12,845.50" (48px, bold, deep navy, tabular numbers)
  - Trend indicator: "Last 30 Days ↗ +2.5%" (14px, mint green with arrow icon)
  - Line chart: 
    - Mint green line `#00D68F`
    - 2-3px stroke width
    - Smooth curves
    - No background grid
    - Subtle gradient fill below line (optional)
    - Height: ~100px

**Section 2: Spending Overview Card (Middle)**

- **Visual Style:**
  - White card, standard shadow `0 2px 8px rgba(0, 0, 0, 0.04)`
  - Border radius: 16px
  - Padding: 24px
  - Margin bottom: 24px

- **Header:**
  - Title: "Spending Overview" (20px, semibold, left)
  - Link: "Details" (16px, mint green, right)
  - Subtitle: "Top categories this month." (14px, gray)

- **Category Progress Bars:**
  - Each category shows:
    - Category name (left, 16px semibold, deep navy): "Groceries"
    - Progress bar: 
      - Fill: Mint green `#00D68F`
      - Track: Light gray `#E9ECEF`
      - Height: 8px
      - Border radius: 20px (pill)
      - Full width minus text space
    - Amount: "$450 / $800" (14px, gray, right)
  - Gap between categories: 16px
  - Show 3-4 top categories

**Section 3: Upcoming Bills Card (Middle)**

- **Visual Style:**
  - White card, standard shadow
  - Border radius: 16px
  - Padding: 24px
  - Margin bottom: 24px

- **Title:** "Upcoming Bills" (20px, semibold)

- **Bill List Items:**
  - Each bill card:
    - Icon: 24px in tinted circle (left) - e.g., Netflix icon in mint tint
    - Service name: "Netflix" (16px, semibold, deep navy)
    - Due date: "Due in 3 days" (14px, gray)
    - Amount: "$15.99" (16px, semibold, right)
    - Background: Very light tint or white
    - Border radius: 12px
    - Padding: 12px
    - Gap: 12px between items
  - Show 3-4 bills max, "View all" link if more

**Section 4: Recent Transactions (Bottom)**

- **Title:** "Recent Transactions" (20px, semibold)

- **Transaction List:**
  - Each transaction:
    - Icon: 24px in tinted square/circle (left) - category icon
    - Name: "SuperMart" (16px, semibold)
    - Timestamp: "Today, 1:45 PM" (14px, gray)
    - Amount: "-$72.50" (16px, semibold, right)
    - Border radius: 12px
    - Padding: 12px
    - Gap: 12px
  - Show 3-4 recent, "View all" option

**Section 5: Floating Action Button (FAB)**

- **Position:** Fixed bottom-right, 24px from edges
- **Appearance:**
  - Size: 64px circle
  - Background: Mint green `#00D68F`
  - Icon: White "+" (24px)
  - Shadow: `0 4px 12px rgba(0, 209, 143, 0.3)`
- **Action:** Opens "Add Transaction" modal

**Bottom Navigation:**
- 4 items: Dashboard (active, mint), Analysis (gray), Accounts (gray), Settings (gray)
- Active state: Mint green icon + text, subtle background tint
- Height: 64px

**Acceptance Criteria:**

- [ ] Dashboard loads with skeleton loading states
- [ ] Summary cards are visually distinct and scannable
- [ ] Charts are simple, clear, not overwhelming
- [ ] Empty states are handled gracefully
- [ ] Quick actions (FAB) are prominent but not intrusive
- [ ] Design feels calm and organized, not cramped
- [ ] Responsive layout works on mobile, tablet, desktop
- [ ] All elements match visual design specifications (colors, spacing, typography)

---

### 💰 **PHASE 3: INCOME TRACKING**

**Purpose:** Track salary invoices and other income sources. Primarily automated via Google Drive import, with manual fallback.

#### Screen: Income Overview

**Layout:**

**Top Section: Total Income Summary**

- **Current Month Income:** 
  - Large number: "$2,800" (48px, bold, mint green for positive reinforcement)
  - Label: "This Month" (14px, gray)
  
- **Average Monthly Income:** 
  - Number: "$2,650" (24px, semibold)
  - Label: "3-Month Average" (14px, gray)

- **Trend Chart:** 
  - Line or bar chart showing last 6–12 months
  - Mint green bars or line
  - Height: ~150px
  - X-axis: Month labels
  - Y-axis: Income amounts

**Middle Section: Income List**

- **Table/List View:**
  - Columns: Date, Source (e.g., "Salary - Company X"), Amount, Status (Imported/Manual), Actions
  - Each row:
    - Date: 14px, gray
    - Source: 16px, semibold, with briefcase icon
    - Amount: 16px, semibold, mint green
    - Status badge: "Imported" (small pill, gray background) or "Manual"
    - Actions: Edit/Delete icons (24px)
  - White cards, 12px radius, 16px padding
  - Gap: 12px

- **Visual Treatment:**
  - Clean, spacious rows
  - Subtle mint accent for income (positive money)
  - Sortable by date, amount (arrows in headers)
  - Filters: Date range dropdown, source type dropdown

**Bottom Section: Add Income**

- **Button:** "+ Add Income Manually" (outlined mint, full-width or prominent)
- **Import Button:** "Import from Drive" (outlined blue, secondary)

- **Modal/Form Fields:**
  - Date (calendar picker, defaults to today)
  - Source (text input or dropdown: Salary, Freelance, Gift, Other)
  - Amount (currency input, large: $0.00, autofocus)
  - Category (dropdown with icons)
  - Optional: Upload invoice file (drag-drop area)
  - Notes (optional text area, 2-3 lines)
  - Primary CTA: "Add Income" (mint green, full-width)

**Feature: Google Drive Integration for Salary Invoices**

- **UX Flow:**
  1. User clicks "Import from Drive"
  2. Google OAuth permission modal appears (if not connected)
  3. User authorizes or selects folder
  4. Loading state: "Scanning Drive... 23 files found" (progress spinner)
  5. Results screen:
     - Thumbnail previews of invoices (PDF/image)
     - Checkboxes to select which to import
     - Extracted data preview (amount, date, source) - editable
  6. User confirms selections
  7. Success message: "3 invoices imported!" (green checkmark)

- **Design Requirements:**
  - Progress indicator during scan (spinner + count)
  - Thumbnail grid: 3 columns on desktop, 2 on mobile
  - Editable fields before final import
  - Success toast at bottom

**Acceptance Criteria:**

- [ ] User can view all income in chronological order
- [ ] User can filter and sort income
- [ ] User can manually add income with clear form validation
- [ ] User can import income from Google Drive with clear status feedback
- [ ] Imported data is pre-filled but editable
- [ ] Empty state shows clear CTA
- [ ] Design feels organized and calm, not data-heavy
- [ ] All visual specs match (colors, typography, spacing)

---

### 🧾 **PHASE 4: BILLS TRACKING**

**Purpose:** Track recurring monthly bills (electricity, water, internet, phone, subscriptions). Automated via email/Drive import, with manual entry fallback.

#### Screen: Bills Overview

**Top Section: Bills Summary**

- **Total Bills This Month:** "$342" (48px, bold, deep navy)
- **Bills Paid vs. Pending:** 
  - Visual split: "5 paid, 2 pending" (16px)
  - Donut chart or simple fraction visual
- **Comparison vs. Last Month:** "↓ 8% vs. last month" (14px, mint green with arrow)

**Middle Section: Bills List**

- **Card Grid or List View:**
  - Each bill card shows:
    - Service icon: 24px in tinted circle (left) - e.g., lightning for electricity
    - Service name: "EDP Electricity" (16px, semibold)
    - Amount: "$67" (20px, bold, right)
    - Due date: "Due in 5 days" or "Nov 20" (14px, gray)
    - Status badge: 
      - "Paid" (mint green background, white text)
      - "Pending" (yellow background)
      - "Overdue" (red background)
    - Category icon: Electricity, water, internet, phone icons
  - Visual treatment:
    - White cards, 16px radius, 16px padding
    - Color-coded left border (4px) based on status
    - Gap: 16px between cards
  - Actions: View details, Mark as paid, Edit, Delete (hidden until tap/hover)

**Bottom Section: Add Bill**

- **Button:** "+ Add Bill Manually" (mint green, prominent)
- **Import Button:** "Scan Email for Bills" (outlined blue)

- **Modal/Form Fields:**
  - Service name (text input)
  - Category (dropdown with icons: Electricity, Water, Internet, Phone, Rent, Subscription, Other)
  - Amount (currency input)
  - Due date (calendar picker)
  - Frequency (dropdown: One-time, Monthly, Quarterly, Yearly)
  - Status (dropdown: Paid, Pending)
  - Optional: Upload bill file (PDF, image)
  - Notes (optional)
  - CTA: "Add Bill" (mint green, full-width)

**Feature: Email/Drive Integration for Bill Import**

- **UX Flow:**
  1. User clicks "Scan Email for Bills" or "Import from Drive"
  2. Permission modal (if not already granted)
  3. Loading: "Scanning inbox... 47 emails found"
  4. Results screen:
     - List of found bills with preview cards
     - Each card shows: Merchant, Date, Amount, Confidence % (OCR)
     - Checkboxes to select
     - Editable fields
  5. User confirms
  6. Success: "7 bills imported"

- **Design Requirements:**
  - Loading spinner with progress
  - Preview cards: Thumbnail + extracted data
  - Confidence indicator: "90% confident" (green) or "50% confident" (yellow - needs review)
  - All fields editable
  - Success toast

**Feature: Recurring Bill Tracking**

- **Automatic Recurrence:**
  - User sets bill as "Monthly" → App expects it next month
  - If missing: Alert card "Your electricity bill hasn't arrived yet"

- **UX for Recurrence:**
  - Bill detail view: Timeline showing past bills and expected future bills
  - Toggle: "Variable amount" or "Fixed amount"
  - Historical chart: Line showing bill trends over 12 months

**Acceptance Criteria:**

- [ ] User can view all bills in clear, scannable layout
- [ ] User can filter by status, category, date
- [ ] User can manually add bills with full validation
- [ ] User can import bills from email/Drive with clear feedback
- [ ] Imported data is editable before saving
- [ ] Recurring bills are tracked and alerted if missing
- [ ] Bill history shows trends over time
- [ ] Empty state is friendly and actionable
- [ ] Design uses color/iconography effectively per spec

---

### 💳 **PHASE 5: SPENDING TRACKING**

**Purpose:** Track daily expenses (groceries, dining, transport, entertainment). Supports manual entry and photo-based bill scanning.

#### Screen: Spending Overview

**Top Section: Spending Summary**

- **Total Spent This Month:** "$1,245" (48px, bold, deep navy)
- **Breakdown by Category:** 
  - Donut chart or horizontal stacked bar
  - Colors: Different tint per category (mint, blue, coral, etc.)
  - Legend: Category name + percentage (e.g., "Groceries 35%")
  - Interactive: Click category to filter
- **Comparison vs. Last Month:** "↑ 12% vs. last month" (14px, coral if higher, mint if lower)

**Middle Section: Spending List**

- **Timeline/List View:**
  - Group by date: "Today", "Yesterday", "Nov 13", etc. (16px, semibold, gray)
  - Each expense card:
    - Category icon: 24px in tinted square/circle (left)
    - Description: "Lunch at Café" (16px, semibold)
    - Date/time: "Nov 15, 3:42 PM" (14px, gray)
    - Amount: "$12.50" (16px, semibold, right)
    - Actions: View, Edit, Delete (hidden)
  - Visual: White cards, 12px radius, 12px padding, gap 12px
  - Left accent: 4px colored bar matching category

**Bottom Section: Add Expense**

- **Prominent Button:** "+ Add Expense" (mint green, full-width or FAB)

- **Two Entry Methods:**

  **Method 1: Manual Entry**
  - Modal (bottom sheet):
    - Segmented control: "Expense" (selected) | "Income"
    - Amount: Large input "$0.00" (36px, autofocus)
    - Category: Dropdown with icons (Groceries, Dining, Transport, Entertainment, Health, Shopping, Other)
    - Description: Text input (optional)
    - Date: Defaults to today, editable (calendar icon)
    - Payment method: Dropdown (Cash, Card, Other) - optional
    - Optional: Add photo (dashed border upload area)
    - CTA: "Add Transaction" (mint green, full-width)

  **Method 2: Scan Bill**
  - **UX Flow:**
    1. User clicks "Scan Bill"
    2. Camera interface opens (or file upload on desktop)
    3. Camera viewfinder with guide overlay: "Align receipt here" (dashed frame)
    4. User takes photo
    5. Loading: "Extracting data..." (spinner)
    6. Result screen:
       - Photo thumbnail
       - Extracted data: Merchant, Date, Total, Line items (if possible)
       - Confidence indicators per field
       - All fields editable
    7. User confirms or edits
    8. Success: "Expense added!" (green checkmark toast)

  - **Design Requirements:**
    - Clear camera viewfinder with guide
    - Loading state during OCR
    - Confidence badges (90%+ green, <90% yellow)
    - All fields editable before saving
    - Success feedback

**Feature: Category Intelligence**

- **Automatic Categorization:**
  - Based on merchant name (e.g., "Pingo Doce" → Groceries, "Uber" → Transport)
  - Suggested category shown with "Change" link
  - User can edit, app learns from corrections

- **UX:**
  - Suggested category pre-filled in dropdown
  - "Change category" link next to dropdown
  - Visual feedback when category auto-detected (subtle animation)

**Acceptance Criteria:**

- [ ] User can manually add expense in <10 seconds
- [ ] User can scan receipt and extract data (design supports editing)
- [ ] User can view spending by category, date, amount
- [ ] Categories are visually distinct with icons and colors
- [ ] Empty state is encouraging and actionable
- [ ] Design is fast, simple, frictionless
- [ ] All elements match visual specs

---

### 📈 **PHASE 6: INSIGHTS & ANALYSIS**

**Purpose:** Visual dashboards showing trends, patterns, anomalies, and actionable insights.

#### Screen: Insights Dashboard

**Top Section: Overview Cards**

- **Insight Cards (horizontal scrollable or stacked):**
  - Card 1: "You spent 12% less this month!" (mint green background tint, celebration icon)
  - Card 2: "Your electricity bill was 23% higher than usual" (coral tint, warning icon)
  - Card 3: "You could save $45/month by switching internet providers" (blue tint, lightbulb icon)
  - Each card: 16px padding, 12px radius, icon left, text 16px

**Middle Section: Visual Charts**

**Chart 1: Monthly Spending Trend (Line Chart)**
- X-axis: Last 6–12 months
- Y-axis: Total spending
- Line: Mint green, 2-3px, smooth
- Area fill: Gradient from mint to transparent (optional)
- Annotations: Dots/labels for anomalies (e.g., "Spike in August - vacation")
- Height: ~200px

**Chart 2: Category Breakdown (Donut or Bar Chart)**
- Segments: Different colors per category (mint, blue, coral, etc.)
- Percentages: 16px, semibold
- Interactive: Click segment to filter transactions
- Center (donut): Total spending icon or amount
- Legend: Below chart, category name + amount

**Chart 3: Income vs. Expenses (Stacked Bar or Dual Line)**
- X-axis: Months
- Two series: Income (mint green), Expenses (coral)
- Net savings: Highlighted or shown as difference
- Height: ~200px

**Chart 4: Bill Trends (Line Chart - Optional)**
- X-axis: Last 12 months
- Multiple lines: One per bill type (electricity, water, etc.)
- Colors: Category colors
- Identifies seasonal patterns or anomalies

**Bottom Section: Alerts & Recommendations**

- **Alert Cards:**
  - "Your water bill hasn't arrived yet (usually arrives by Nov 10)" - yellow tint, calendar icon
  - "You've spent $200 on dining this month (50% above average)" - coral tint, warning icon
  - "Your salary was $300 lower this month" - blue tint, info icon

- **UX:**
  - Color-coded by urgency:
    - Red background tint: Urgent
    - Yellow/orange: Attention needed
    - Blue: Informational
  - Dismissible (X icon top-right)
  - Actionable links: "Review transaction", "Set budget"
  - Icon: 24px in tinted circle (left)
  - Text: 16px, semibold title + 14px gray description
  - Border radius: 12px, padding 16px

**Feature: Smart Anomaly Detection (Design Only)**

- **Visual Indicators:**
  - Highlight unusual transactions with colored badge
  - Show comparison: "This is 45% higher than your typical electricity bill"
  - Tooltip or expandable: "Why is this flagged?"

- **UX:**
  - Option to "Mark as normal" or "Investigate"
  - Learn from user feedback (design shows this option)

**Acceptance Criteria:**

- [ ] Dashboard shows 3–5 key insights at a glance
- [ ] Charts are clear, interactive, and visually appealing
- [ ] Alerts are helpful, not overwhelming
- [ ] User can drill down into any insight for details
- [ ] Empty state shows "We'll generate insights once you have 1 month of data"
- [ ] Design feels motivating, not stressful
- [ ] All charts use correct colors from palette

---

### ⚙️ **PHASE 7: SETTINGS & PROFILE**

**VISUAL REFERENCE:** "Profile & Settings" screen

**Purpose:** Account management, preferences, data export, premium upgrade.

#### Screen: Settings Overview

**Header:**
- Back arrow (left, 24px)
- Title: "Profile & Settings" (28px, semibold, centered)
- White background, 56px height

**Profile Card (Top)**

- **Visual:**
  - White card, centered, 24px padding
  - Avatar: 120px circle with illustration or photo (beige background in reference)
  - Edit icon: Small blue circle with pencil icon (bottom-right of avatar)
  - Name: "Alex Doe" (20px, semibold, centered below avatar)
  - Email: "alex.doe@email.com" (14px, gray, centered)
  - Border radius: 16px
  - Margin bottom: 24px

**Section 1: ACCOUNT** (14px, gray, uppercase, letter-spacing: 0.5px)

- **Change Password:**
  - Icon: Lock in blue tint circle `#E3F2FD` (40px, left)
  - Text: "Change Password" (16px, semibold)
  - Chevron right: Gray arrow (right)
  - White background, 16px padding, 12px radius
  - Margin bottom: 12px

- **Subscription Plan:**
  - Icon: Badge/star in blue tint circle
  - Text: "Subscription Plan" (16px, semibold)
  - Subtext: "Premium" (14px, gray, below title)
  - Chevron right
  - Same visual style as above

**Section 2: CONNECTED SERVICES**

- **Google Drive:**
  - White card, 16px padding, 12px radius
  - Icon: Google Drive logo in 40px square (left)
  - Text: "Google Drive" (16px, semibold)
  - Subtext: "receipts@alexdoe.com" (14px, gray)
  - Badge: "Connected" (mint green text `#00E676`, right-aligned, 14px semibold)
  - Disconnect button below:
    - Full-width within card
    - Background: Light red tint `#FFE8E8`
    - Text: "Disconnect" (red `#FF5252`, 16px semibold)
    - Border radius: 8px
    - Padding: 12px

**Section 3: PREFERENCES**

- **Push Notifications:**
  - Icon: Bell in blue tint circle
  - Text: "Push Notifications" (16px, semibold)
  - Toggle switch (right): ON state blue/mint, OFF state gray

- **Theme:**
  - Icon: Moon/sun in blue tint circle
  - Text: "Theme" (16px, semibold)
  - Subtext: "System Default" (14px, gray)
  - Chevron right

- **Currency:**
  - Icon: Dollar sign in blue tint circle
  - Text: "Currency" (16px, semibold)
  - Subtext: "USD ($)" (14px, gray)
  - Chevron right

**Section 4: MORE**

- **Help & Support:**
  - Icon: Question mark in blue tint circle
  - Text: "Help & Support"
  - Chevron right

- **Legal:**
  - Icon: Gavel in blue tint circle
  - Text: "Legal"
  - Chevron right

**Action Buttons (Bottom)**

- **Save Changes:**
  - Background: Blue `#5B9BD5`
  - Text: White, 16px semibold
  - Full-width, 16px padding
  - Border radius: 12px
  - Margin bottom: 16px

- **Log Out:**
  - Text link: Red `#FF5252`, 16px semibold
  - Centered below Save button
  - No background

**Acceptance Criteria:**

- [ ] User can edit profile information
- [ ] User can change notification preferences with granular control
- [ ] User can connect/disconnect integrations
- [ ] User can export all data
- [ ] Premium features are clearly marked and compelling
- [ ] Settings are organized and scannable
- [ ] All visual elements match specification

---

### 📤 **PHASE 8: GOOGLE SHEETS EXPORT (DESIGN ONLY)**

**Purpose:** Allow users to export all financial data to Google Sheets for further analysis or archiving. (Backend logic to be built later; Lovable designs the UX only.)

#### Feature Flow

**UX Flow:**

1. User navigates to Settings → Integrations → "Export to Google Sheets"
2. User clicks "Enable Auto-Export" or "Export Now"
3. **If Auto-Export:**
   - Modal explains: "We'll create a Google Sheet in your Drive and update it automatically every week with your latest data."
   - User authorizes Google Sheets access (OAuth)
   - Loading: "Creating sheet..."
   - App creates sheet titled "FinanceFlow - Financial Data 2025"
   - Confirmation: "Export enabled! View your sheet" (link to sheet, mint green)

4. **If Manual Export:**
   - User clicks "Export Now"
   - Modal shows export options:
     - Date range dropdown: "Last month", "Last 3 months", "Last 6 months", "All time"
     - Data types checkboxes: Income, Bills, Spending, All
     - Format: "Google Sheets" (default) or "Download CSV"
   - User clicks "Export" (mint green button)
   - Progress: "Preparing export..." (spinner)
   - Success message with link to sheet or download button

#### Google Sheet Structure (Design Specification)

**Sheet 1: Summary**
- Monthly totals table: Income, Expenses, Net Savings
- Category breakdown table
- Simple charts (bar chart for monthly totals, pie chart for categories)

**Sheet 2: Income**
- Columns: Date, Source, Amount, Category, Notes

**Sheet 3: Bills**
- Columns: Date, Service, Category, Amount, Status, Due Date

**Sheet 4: Spending**
- Columns: Date, Description, Category, Amount, Payment Method

**UX Requirements:**
- Clean, simple table format
- Color-coded headers (mint green)
- Auto-formatted currency
- Charts placed at top of Summary sheet

**Acceptance Criteria:**

- [ ] User can enable auto-export with clear explanation
- [ ] User can manually export with date/type filters
- [ ] Export progress is visible
- [ ] Success confirmation includes link to sheet or download
- [ ] Design supports both free (manual, limited) and premium (auto, unlimited) tiers
- [ ] Empty state: "No data to export yet"

---

### 🎁 **PHASE 9: ADDITIONAL FEATURES & ENHANCEMENTS**

#### Onboarding Flow (First-Time User Experience)

**Screen 1: Welcome**
- App value proposition
- Illustration (64px-96px)
- "Get Started" button (mint green)

**Screen 2: Goals**
- "What do you want to achieve?"
- Checkboxes:
  - Track monthly bills
  - Save for a goal
  - Reduce unnecessary spending
  - Understand my finances better
- "Next" button (mint green)

**Screen 3: Integrations**
- "Connect your accounts for automatic tracking"
- Options: Google Drive, Email (with icons)
- "Allow" (mint green) or "Skip for now" (outlined)

**Screen 4: First Action**
- "Add your first bill or expense to get started"
- Quick-add form or "Scan bill" option

**UX Principles:**
- Skippable (user can exit at any time)
- Progress indicator: "2 of 4" (dots or bar)
- Encouraging, not mandatory
- Saves progress if user exits

#### Notification Center

**VISUAL REFERENCE:** "Notifications" screen

**Header:**
- Back arrow (left)
- Title: "Notifications" (28px, semibold)
- "Mark all as read" (mint green link, right)

**Tab Filter:**
- Three tabs: "All" (active) | "Alerts" | "Insights"
- Active: Mint green underline, bold text
- Inactive: Gray text
- Bottom border: Light gray

**Notification Items:**

- **Each notification card:**
  - Icon: 40px in tinted circle (left) - color based on type
  - Title: "Upcoming Bill Due" (16px, bold, deep navy)
  - Description: "Netflix - $15.99 in 3 days" (14px, gray)
  - Action link: "View Transaction" (mint green, 14px) - optional
  - Timestamp: "2h ago" (14px, gray, right-aligned top)
  - Background: White card, 12px radius, 16px padding
  - Gap: 12px between cards

- **Notification Types (from reference):**
  - Bill due: Calendar icon, mint tint `#E8F8F5`
  - Unusual spending: Warning triangle, coral tint `#FFE8E0`
  - New insight: Lightbulb, blue tint `#E3F2FD`
  - Goal achievement: Celebration icon, green tint `#E8F8F5`
  - Sync success: Sync/arrows icon, gray tint

**Empty State:**
- Icon: Bell with slash (64px, gray)
- Heading: "All caught up!" (24px, semibold)
- Subtext: "You have no new notifications." (16px, gray)
- Centered, spacious

#### Financial Goals Tracker

**VISUAL REFERENCE:** "Your Goals" screen

**Header:**
- Back arrow (left)
- Title: "Your Goals" (28px, semibold, centered)

**Motivational Header:**
- Large text: "Future You" (32px, bold, deep navy)
- Subtext: "Great progress on your goals! You're on your way to achieving them." (16px, gray, line-height 1.6)
- Margin bottom: 32px

**Section: Active Goals**

**Goal Card (each):**
- White card, 16px radius, 16px padding
- Icon: 48px in tinted rounded-square (left) - category icon (home, plane, car)
- Title: "Down Payment fo..." (16px, semibold, truncated if long)
- Progress: "$15,000 / $50,000" (14px, gray)
- Percentage: "30%" (20px, semibold, right-aligned)
- Progress bar:
  - Track: Light gray `#E9ECEF`, 12px height
  - Fill: Category color (mint for home, orange for vacation, blue for car)
  - Border radius: 20px (pill)
  - Full width below text
- Gap between goals: 16px

**Section: Completed Goals**

**Completed Goal Card:**
- Same style as active
- Icon: Achievement icon (graduation cap) in purple tint `#F3E5F5`
- Text: "Pay Off Student Loan" (16px, semibold)
- Status: "Goal Achieved!" (14px, gray)
- Checkmark: Green circle `#00E676` with white check icon (right, 40px)

**FAB:**
- Mint green circle, "+" icon
- Bottom-right, 24px from edges

**Acceptance Criteria:**

- [ ] User can view active and completed goals
- [ ] Progress bars are visually clear with percentages
- [ ] Goals use category-specific colors
- [ ] Completed goals show achievement feedback
- [ ] FAB allows adding new goals
- [ ] Empty state for no goals

---

## 🆓🆙 Free vs. Premium Tier Definition

### Free Tier (Always Free)

**Features Included:**
- Full authentication and account management
- Manual income, bill, and spending entry (unlimited)
- Google Drive import (up to 20 files/month)
- Email bill scanning (up to 10 bills/month)
- Basic dashboard and insights
- Manual photo-based bill scanning (up to 10 scans/month)
- Notification settings (all types)
- Data export (manual, once per month)

**Limitations:**
- No auto-export to Google Sheets
- No advanced insights (AI suggestions, predictions)
- Limited import quotas
- Optional: Ads (non-intrusive banner ads)

### Premium Tier (Paid)

**Pricing Suggestion:** €4.99/month or €49/year (15% discount)

**Premium Features:**
- Unlimited Google Drive imports
- Unlimited email bill scanning
- Unlimited photo-based bill scanning
- **Auto-export to Google Sheets** (weekly or monthly)
- Advanced AI insights and predictions
- Custom categories and tags
- Priority support
- Ad-free experience
- Budget tracking (if implemented)
- Multi-currency support (if implemented)

**UX for Premium:**
- Free users see "Unlock with Premium" badges on locked features
- Badge style: Small pill, coral background, white text, "Premium"
- Clear, compelling upgrade CTAs (not aggressive)
  - "Upgrade to Premium" (coral button, outlined)
- 7-day free trial for Premium
- Easy cancellation (user-friendly, no dark patterns)

---

## 📏 Design System Summary for Lovable

### **CORE VISUAL PILLARS:**

1. **Light & Airy:** Generous whitespace, soft shadows, breathing room
2. **Friendly & Approachable:** Rounded corners, gentle colors, supportive language
3. **Clean & Organized:** Clear hierarchy, consistent spacing, minimal clutter
4. **Motivating & Positive:** Green for growth, blue for trust, coral for attention (never red for shame)
5. **Professional but Human:** Not corporate/cold, not childish/playful—balanced

### **COLOR USAGE RULES:**

- **Mint Green `#00D68F`:** Primary CTAs, success, income, savings, progress, FAB
- **Sky Blue `#87CEEB`:** Charts, data, informational elements
- **Blue `#5B9BD5`:** Secondary CTAs, links, active states, "Save Changes"
- **Coral `#FF7F50`:** Attention, alerts (not errors), "Get Started" secondary
- **Red `#FF5252`:** Destructive actions ONLY (disconnect, logout, errors)
- **Green (bright) `#00E676`:** Success confirmations, checkmarks, "connected" badges
- **Yellow/Orange `#FFB020`:** Warnings, pending, unusual activity
- **Deep Navy `#001F3F`:** Primary text, headings, high contrast
- **Gray scale:** Supporting text, borders, disabled states

### **TYPOGRAPHY RULES:**

- Always use weight 600+ for headings and buttons (semibold/bold)
- Body text: weight 400 (regular)
- Small metadata: weight 400-500, gray color
- Maintain 1.5+ line-height for readability
- Use tabular numbers for financial amounts

### **SPACING RULES:**

- Derive all spacing from 8px base unit
- Card padding: 16px-32px (based on importance)
- List item gaps: 12px-16px
- Section gaps: 32px-48px
- Never cramped—when in doubt, add more space

### **BORDER RADIUS RULES:**

- Small elements: 6px-8px
- Buttons/inputs: 12px-16px
- Cards: 16px-20px
- Modals: 20px-24px
- Always round, never sharp (except icons)

### **SHADOW RULES:**

- Default cards: Very subtle `0 2px 8px rgba(0,0,0,0.04)`
- Hover/focus: Slightly lifted `0 4px 16px rgba(0,0,0,0.08)`
- Modals: Clear elevation `0 8px 32px rgba(0,0,0,0.12)`
- FAB: Colored shadow matching button color
- Never heavy or dark shadows

### **ICON RULES:**

- Use outline/line style (not filled)
- Consistent stroke width (2px)
- Place in tinted circles/squares for categories
- 24px standard, 40px-48px for featured

### **BUTTON RULES:**

- Primary CTA: Always mint green background
- Secondary: Blue or outlined mint
- Text links: Blue or mint, no underline unless hover
- Destructive: Red text on white/light red background
- Generous padding (16px vertical minimum)
- Always rounded corners (12px-16px)

### **ANIMATION RULES:**

- Fast (150-200ms): Button press, hover
- Medium (250-300ms): Modal open, transitions
- Smooth easing: `ease-in-out`
- Purposeful only—don't animate everything
- Never sluggish or distracting

---

## 🚧 Scope: In-Scope vs. Out-of-Scope

### ✅ In-Scope (Lovable Must Design)

- Complete authentication flow (sign-up, log-in, password reset, email verification)
- Dashboard with summary cards, charts, quick actions
- Income tracking screen (list, add, edit, import UI)
- Bills tracking screen (list, add, edit, import UI, recurring logic UI)
- Spending tracking screen (list, add, edit, photo-scanning UI)
- Insights dashboard (charts, alerts, recommendations)
- Settings & profile (account, preferences, notifications, integrations, premium)
- Google Sheets export UI (enable, configure, export button)
- Onboarding flow (welcome, goals, permissions)
- Notification center (list, filters, empty state)
- Financial goals tracker (active, completed, add goal)
- Empty states for all features
- Free vs. premium UI differentiation
- Responsive layouts (mobile, tablet, desktop)
- Loading states, error states, success confirmations
- Navigation system (bottom nav, side nav)
- Design system (colors, typography, spacing, components)

### ❌ Out-of-Scope (Backend/Logic — Handled Later)

- Actual Google Drive API integration (Lovable designs the UI only)
- Actual Gmail API integration (Lovable designs the UI only)
- OCR/image processing for bill scanning (Lovable designs the upload/result UI only)
- Data parsing algorithms (invoice extraction logic)
- Google Sheets API integration (Lovable designs export flow only)
- Anomaly detection algorithms (Lovable designs how alerts are displayed only)
- Payment processing for premium subscriptions (Lovable designs upgrade flow only)
- Database schema or backend infrastructure
- Authentication backend (Lovable designs auth screens only; backend to be built separately)
- Email sending (password reset, notifications)
- Push notifications (Lovable designs settings only)

**Important Note for Lovable:** This PRD defines the complete user experience and interface. Lovable is responsible for creating functional, polished, pixel-perfect designs and front-end implementations. All backend logic, API integrations, and data processing will be handled in a separate development phase. Lovable should design with the assumption that all backend features will eventually work as described, but should not implement the backend itself.

---

## 🎯 Acceptance Criteria (Master Checklist)

### Authentication
- [ ] User can sign up with Google OAuth in <3 clicks
- [ ] User can sign up with email/password with clear validation
- [ ] Password strength is visually indicated
- [ ] User can log in with autofill support
- [ ] User can reset password via email flow
- [ ] Email verification is handled gracefully
- [ ] Post-login onboarding is skippable but encouraged
- [ ] All auth states (loading, error, success) are clear

### Dashboard
- [ ] Summary cards show income, spending, remaining budget
- [ ] Charts are simple, clear, and interactive
- [ ] Upcoming bills are visible and actionable
- [ ] Recent activity is scannable
- [ ] Quick actions are prominent (FAB)
- [ ] Empty state is welcoming and actionable
- [ ] Responsive layout works on all screen sizes
- [ ] All visual elements match design specifications

### Income
- [ ] User can add income manually with validation
- [ ] User can import from Google Drive (UI only)
- [ ] Income list is sortable and filterable
- [ ] Historical income chart is visible
- [ ] Empty state is clear

### Bills
- [ ] User can add bills manually with category/frequency
- [ ] User can import bills from email/Drive (UI only)
- [ ] Bills are visually color-coded by status
- [ ] Recurring bills are tracked
- [ ] Bill trends are visible
- [ ] Empty state is encouraging

### Spending
- [ ] User can add expenses manually in <10 sec
- [ ] User can scan receipts (UI only)
- [ ] Spending is categorized with icons/colors
- [ ] Category breakdown chart is clear
- [ ] Empty state is actionable

### Insights
- [ ] Dashboard shows 3–5 key insights
- [ ] Charts are interactive and beautiful
- [ ] Alerts are helpful, not overwhelming
- [ ] User can drill down into insights
- [ ] Empty state explains when insights appear

### Settings
- [ ] User can edit profile and preferences
- [ ] Notification settings are granular
- [ ] Integrations can be connected/disconnected
- [ ] Data export is clear
- [ ] Premium features are compelling

### Notifications
- [ ] User can view all notifications
- [ ] Notifications are filterable by type
- [ ] Each notification is actionable or dismissible
- [ ] Empty state is positive

### Goals
- [ ] User can view active and completed goals
- [ ] Progress is visually clear
- [ ] User can add new goals
- [ ] Completed goals show achievement

### Premium
- [ ] Free vs. premium features are clearly differentiated
- [ ] Upgrade flow is simple and compelling
- [ ] Free users see value of premium without friction

### Design Quality
- [ ] Visual design matches reference examples in tone and polish
- [ ] Color palette is exactly as specified
- [ ] Typography is clean and readable (Inter, correct sizes/weights)
- [ ] Spacing is generous and consistent (8px base unit)
- [ ] Border radius creates friendly feel (12-20px)
- [ ] Shadows are subtle and appropriate
- [ ] Animations are smooth and purposeful (150-300ms)
- [ ] Icons are outline style, consistent
- [ ] Design feels breezy, motivating, supportive

---

## ✅ Lovable's Design Checklist

Before building each screen, Lovable must verify:

- [ ] Color palette matches reference EXACTLY (use provided hex codes)
- [ ] Typography scale matches reference (sizes, weights, colors)
- [ ] Spacing follows 8px base unit system
- [ ] Border radius values are soft and consistent (12px-20px for most elements)
- [ ] Shadows are subtle and match specifications
- [ ] Icons are outline style with consistent stroke
- [ ] Buttons use correct colors (mint for primary, blue for secondary, red for destructive)
- [ ] Cards have proper padding and elevation
- [ ] Empty states are friendly and encouraging
- [ ] Loading/error states are handled gracefully
- [ ] Animations are smooth and purposeful (150-300ms)
- [ ] Navigation matches bottom-bar pattern from reference
- [ ] Forms use correct input styles (rounded, subtle borders)
- [ ] Overall feel is "light, freeing, and insightful"

---

## 🚀 Creative Freedom Guidelines for Lovable

### **YOU MAY:**
- Add delightful micro-interactions that enhance UX (button ripples, smooth transitions)
- Create additional empty state illustrations that match the tone
- Design screens not explicitly shown in references (using the established system)
- Propose layout optimizations for different screen sizes
- Add helpful tooltips, hints, or onboarding elements
- Enhance data visualizations with interactive features
- Suggest UX improvements that maintain visual consistency

### **YOU MUST NOT:**
- Change the core color palette (especially the mint green)
- Use different typography (stick to Inter or similar)
- Alter the friendly, rounded aesthetic (no sharp corners)
- Make shadows heavier or darker
- Use filled icons instead of outline
- Create cluttered or busy layouts
- Add excessive animations or transitions
- Deviate from the "light and airy" spacing philosophy

### **WHEN IN DOUBT:**
- Refer back to the reference design screenshots
- Ask: "Does this feel light, freeing, and motivating?"
- Choose the simpler, cleaner option
- Add more whitespace, not less
- Use the mint green for primary actions
- Keep it friendly, never corporate or cold

---

## 📐 Responsive Design Notes

**Mobile-First Approach (375px):**
- Design for mobile width first
- Bottom navigation for primary nav
- Full-width buttons and cards
- Stack elements vertically
- Generous tap targets (min 44px)

**Tablet (768px+):**
- Maintain single-column layout (centered, max-width 480px-600px)
- Slightly larger cards and spacing
- Could introduce side navigation (optional)

**Desktop (1024px+):**
- Centered content, max-width 600px
- Optional: Side navigation instead of bottom bar
- Two-column layouts for forms (optional)
- Hover states become more prominent

**Key Responsive Rules:**
- Always maintain the core visual language
- Never sacrifice whitespace for content density
- Keep buttons and inputs at comfortable sizes
- Ensure charts scale gracefully

---

## 🏁 Implementation Notes for Lovable

### Priority Order

**Phase 0 (FIRST):** Authentication — Do not proceed until authentication is fully designed and functional

**Phase 1:** Core app structure (navigation, empty states, dashboard skeleton)

**Phase 2:** Dashboard (summary cards, charts, quick actions)

**Phase 3:** Income tracking

**Phase 4:** Bills tracking

**Phase 5:** Spending tracking

**Phase 6:** Insights & analysis

**Phase 7:** Settings & profile

**Phase 8:** Google Sheets export UI

**Phase 9:** Onboarding, notifications, goals, premium upgrade

### Design Review Checkpoints

After each phase, review:
1. Does the design match the reference examples in tone, color, spacing, and rhythm?
2. Are all empty states designed and encouraging?
3. Are loading, error, and success states handled?
4. Is the design responsive and accessible?
5. Are interactions smooth and delightful?
6. Is the visual hierarchy clear?
7. Can a user complete key tasks without confusion?

### Collaboration Notes

- **Design Iteration:** Lovable should iterate on designs based on usability and aesthetic feedback
- **Component Reusability:** Build a component library (buttons, cards, inputs, modals) for consistency
- **Accessibility:** Ensure WCAG 2.1 AA compliance (color contrast, keyboard navigation, screen reader support)
- **Performance:** Optimize for fast load times (lazy loading, skeleton screens)

---

## 📚 Appendix: Expert Team Recommendations

### From UX Designers:
- "Keep the dashboard scannable — users should grasp their financial status in <5 seconds"
- "Use progressive disclosure — show summary first, details on demand"
- "Make empty states encouraging, not punishing"
- "Ensure every action has immediate visual feedback"

### From Developers:
- "Design with API integration in mind — leave placeholders for backend data"
- "Plan for offline states and sync indicators"
- "Consider loading states for slow network conditions"

### From Psychologists:
- "Frame spending insights positively — celebrate wins, gently flag issues"
- "Use motivating language, not shame-based messaging"
- "Provide control and transparency — users should feel empowered, not surveilled"

### From Financial Literacy Specialists:
- "Use simple, jargon-free language — avoid terms like 'liabilities' or 'net cash flow'"
- "Provide educational tooltips where helpful (e.g., 'What is a recurring bill?')"
- "Help users set realistic goals based on their income"

### From Marketers:
- "The free tier should be genuinely useful — users should feel value before upgrading"
- "Premium features should solve clear pain points (e.g., automation, time-saving)"
- "Use social proof in onboarding (e.g., 'Join 10,000+ users taking control of their finances')"

### From Focus Groups (Target Users):
- "I want to see my money situation at a glance, not dig through menus"
- "I love the idea of automatic bill tracking — I always forget to log them"
- "Please don't make me feel bad about spending — just help me be aware"
- "I'd pay for a premium version if it saves me time and stress"

---

## 🎯 FINAL REMINDER TO LOVABLE

**The reference designs you've been provided are NOT suggestions—they are the visual foundation the client loves and expects.**

Your job is to:
1. **Replicate the exact visual language** (colors, typography, spacing, shapes, shadows)
2. **Extend the design system** to screens not shown in references
3. **Add delightful details** that enhance the established aesthetic
4. **Maintain consistency** across every screen and interaction

**Success = The client says:**
"This looks EXACTLY like what I envisioned, and you even made it better in places I didn't expect!"

**Failure = The client says:**
"This doesn't match my designs" or "The colors/spacing/feel is different than what I showed you"

**When in doubt:** Look at the references, honor the mint green, keep it light and airy, stay friendly and motivating.

---

**End of Complete PRD**

**This document contains all functional requirements, visual design specifications, UX patterns, and implementation guidelines. Lovable should use this as the single source of truth for building FinanceFlow.**

---

**Document Length:** ~400+ words (comprehensive specification)  
**Last Updated:** November 16, 2025  
**Version:** 1.0 - Final Complete Specification
