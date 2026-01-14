# Header Component Structure

This directory contains the refactored Header component and its sub-components.

## File Structure

```
shared/header/
├── Header.tsx              # Main header component (orchestrator)
├── Logo.tsx                # Logo component
├── HamburgerButton.tsx     # Mobile menu toggle button
├── NavLinkItem.tsx         # Individual navigation link
├── DropdownButton.tsx      # Dropdown trigger button
├── DropdownMenu.tsx        # Desktop dropdown menu
├── MobileNav.tsx           # Mobile navigation menu
├── DesktopNav.tsx          # Desktop navigation menu
├── JoinButton.tsx          # "Join Now" CTA button
├── navData.ts              # Navigation data structure
└── index.ts                # Barrel exports
```

## Component Responsibilities

### Header.tsx (Main Component)
- Manages scroll state
- Handles navigation open/close state
- Coordinates all sub-components
- Provides sticky header with scroll animations

### Logo.tsx
- Displays company logo
- Handles logo link to homepage

### HamburgerButton.tsx
- Mobile menu toggle button
- Animated hamburger/close icon
- Reusable for any menu toggle

### NavLinkItem.tsx
- Individual navigation link with hover effects
- Consistent styling across all links

### DropdownButton.tsx
- Dropdown trigger with arrow indicator
- Hover animations

### DropdownMenu.tsx
- Desktop dropdown with multi-column layout
- Category-based navigation structure
- Smooth transitions

### MobileNav.tsx
- Full mobile navigation with portal rendering
- Backdrop overlay
- Expandable dropdown sections
- Scroll handling

### DesktopNav.tsx
- Horizontal navigation for desktop
- Integrates NavLinkItem and DropdownMenu

### JoinButton.tsx
- Call-to-action button
- Hover effects and animations

### navData.ts
- Centralized navigation data
- Easy to update menu structure
- Type-safe navigation items

## Usage

```tsx
import Header from "@/components/shared/header";

// Or import individual components
import { Logo, MobileNav, DesktopNav } from "@/components/shared/header";
```

## Benefits of This Refactoring

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be used independently
3. **Maintainability**: Changes are isolated to specific files
4. **Testability**: Smaller components are easier to test
5. **Readability**: Main Header.tsx is now ~80 lines instead of 400+
6. **Type Safety**: Clear prop interfaces for each component
7. **Separation of Concerns**: Data, logic, and presentation are separated

## Future Improvements

- Add unit tests for each component
- Add Storybook stories for component showcase
- Consider extracting scroll logic to a custom hook
- Add accessibility improvements (ARIA labels, keyboard navigation)
