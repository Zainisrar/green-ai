# Navigation State Management with Redux

This project now includes Redux state management for tracking the navigation open/closed state across the entire application.

## Setup

The Redux store is already configured and wrapped around the app in `src/app/layout.tsx`.

## Hook Usage

### `useNavigationState()`

Import and use this hook in any component to access or control the navigation state:

```typescript
import { useNavigationState } from '../hooks/useNavigationState';

const MyComponent = () => {
  const { 
    isNavigationOpen,     // boolean - current state
    openNavigation,       // function - opens navigation
    closeNavigation,      // function - closes navigation  
    toggleNavigation      // function - toggles navigation
  } = useNavigationState();

  return (
    <div>
      {isNavigationOpen ? (
        <p>Navigation is currently OPEN</p>
      ) : (
        <p>Navigation is currently CLOSED</p>
      )}
      
      <button onClick={openNavigation}>Open Nav</button>
      <button onClick={closeNavigation}>Close Nav</button>
      <button onClick={toggleNavigation}>Toggle Nav</button>
    </div>
  );
};
```

## Return Values

- `isNavigationOpen: boolean` - Returns `true` when TopNavigation is open, `false` when closed
- `openNavigation: () => void` - Function to open the navigation
- `closeNavigation: () => void` - Function to close the navigation  
- `toggleNavigation: () => void` - Function to toggle navigation state

## Integration

The hook is already integrated into:
- `TopNavigation.tsx` - Controls opening/closing navigation
- `Navigation.tsx` - Updates Redux state when navigation closes

## Example Use Cases

1. **Conditional Rendering**: Show/hide elements based on navigation state
2. **Styling**: Apply different styles when navigation is open
3. **Scroll Prevention**: Disable scrolling when navigation is open
4. **Analytics**: Track navigation usage
5. **Accessibility**: Manage focus and ARIA states

## Files Structure

```
src/
├── store/
│   ├── store.ts              # Redux store configuration
│   └── navigationSlice.ts    # Navigation state slice
├── hooks/
│   └── useNavigationState.ts # Custom hook for navigation state
├── providers/
│   └── ReduxProvider.tsx     # Redux provider wrapper
└── examples/
    └── NavigationStateExample.tsx # Usage example
```

## Installation

The required dependencies are already added to package.json:
- `@reduxjs/toolkit`: Redux state management
- `react-redux`: React bindings for Redux

Run `npm install` to install the new dependencies.