

# 🍽️ Recipe Explorer App

A Next.js app for exploring meals and recipes using [TheMealDB API](https://www.themealdb.com/), featuring category browsing, meal details, search, and local feedback.

---

## ⚙️ Local Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)

### Steps

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/recipe-explorer.git
   cd recipe-explorer
   ```

2. **Install dependencies**  
   ```bash
   pnpm install
   ```

3. **Run the development server**  
   ```bash
   pnpm dev
   ```

4. **Open the app**  
   Visit `http://localhost:3000` in your browser.

---

## 📦 Folder Structure

```
app/
  ├── categories/        # Page to list all meal categories
  ├── category/          # Dynamic route to list meals for a specific category
  ├── recipe/            # Dynamic route to show recipe details

components/
  ├── ui/                # Reusable UI components (e.g., buttons, cards)
  ├── ...                # Other layout or presentation components

hooks/                   # Custom React Query hooks for data fetching

lib/
  ├── api.ts             # All API logic using fetch for meals and feedback
  ├── utils.ts          # Utility functions 
```

---

## 🔄 Data Fetching Strategy

This project uses **[React Query (@tanstack/react-query)](https://tanstack.com/query/v5)** for all client-side data fetching:

- API calls are encapsulated in functions under `lib/api.ts`.
- Hooks in `hooks/` directory (e.g., `useRandomMeals`, `useMealDetails`) wrap these API calls using `useQuery`.
- Query caching, stale time, and re-fetching behaviors are controlled globally via a shared `QueryClient` setup in `Providers`.

```tsx
<QueryClientProvider client={queryClient}>
  <ThemeProvider>
    {children}
  </ThemeProvider>
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

Each custom hook is built around meaningful `queryKey`s for cache management. Example:

```ts
export function useMealDetails(id: string) {
  return useQuery({
    queryKey: ["meal", id],
    queryFn: () => fetchMealById(id),
    enabled: !!id,
  })
}
```

Additionally:

- Feedback and favorites are stored using `localStorage`, and React Query is used to sync it into the UI.
- A small simulated delay and error handling are implemented for feedback submission to mimic real-world APIs.

---

## 💡 Notes

- All components using `useQuery` are inside **client components** using `"use client"`.
- Styling and theming are handled via a custom `ThemeProvider`.

---
