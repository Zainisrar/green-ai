# Custom Hooks

This directory contains custom React hooks that integrate with TanStack Query for data fetching.

## useWhyGreen Hook

The `useWhyGreen` hook fetches data from the Why Green API endpoint and provides:

- **whyGreenData**: The parsed data from the API
- **isLoading**: Loading state
- **error**: Error state if the request fails
- **hasData**: Boolean indicating if valid data is available

### Usage

```tsx
import { useWhyGreen } from '../../../hooks/useWhyGreen';

const MyComponent = () => {
  const { whyGreenData, isLoading, error } = useWhyGreen();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  
  return (
    <div>
      <h1>{whyGreenData?.key.text}</h1>
      {whyGreenData?.icons.map(icon => (
        <div key={icon.text}>
          <img src={icon.img.src} alt={icon.img.alt} />
          <h3>{icon.text}</h3>
          <p>{icon.description}</p>
        </div>
      ))}
    </div>
  );
};
```

### API Response Structure

The hook expects the following response structure:

```typescript
interface WhyGreenResponse {
  success: boolean;
  data: WhyGreenData[];
}

interface WhyGreenData {
  id: number;
  key: { text: string };
  content: string; // HTML content
  icons: Array<{
    img: { alt: string; src: string };
    text: string;
    description: string;
  }>;
  createdAt: string;
  updatedAt: string;
}
```

The hook automatically extracts the first item from the data array and provides it as `whyGreenData`.