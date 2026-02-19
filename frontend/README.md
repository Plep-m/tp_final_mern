# Frontend - MVC Architecture

Simple MVC structure for team collaboration.

## Structure

```
src/
├── models/               # MODEL - Data layer
│   ├── api.ts           # API service (fetch wrapper)
│   └── cart.ts          # Cart localStorage service
│
├── controllers/          # CONTROLLER - Business logic
│   └── AuthController.tsx  # Auth context (login, logout, user state)
│
└── views/               # VIEW - UI layer
    ├── pages/           # Page components
    │   ├── LoginPage.tsx
    │   ├── RegisterPage.tsx
    │   ├── ProductsPage.tsx
    │   ├── CartPage.tsx
    │   ├── OrdersPage.tsx
    │   ├── AdminUsersPage.tsx
    │   └── AdminProductsPage.tsx
    │
    └── components/      # Shared components
        └── ProtectedRoute.tsx
```

## Team Division

### Dev 1 - Auth & Users
- `models/api.ts` (auth methods)
- `controllers/AuthController.tsx`
- `views/pages/LoginPage.tsx`
- `views/pages/RegisterPage.tsx`
- `views/pages/AdminUsersPage.tsx`

### Dev 2 - Products
- `models/api.ts` (product methods)
- `views/pages/ProductsPage.tsx`
- `views/pages/AdminProductsPage.tsx`

### Dev 3 - Cart & Orders
- `models/cart.ts`
- `models/api.ts` (order methods)
- `views/pages/CartPage.tsx`
- `views/pages/OrdersPage.tsx`

## Guidelines

**Models** - Pure data logic, no UI
- API calls (fetch)
- LocalStorage operations
- Data transformations

**Controllers** - Business logic & state
- React Context
- Custom hooks (if needed)
- Auth logic
- Form validation

**Views** - UI only
- React components
- Display data from models/controllers
- Handle user events
- NO direct API calls (use models)
- NO complex logic (use controllers)

## Import Rules

```tsx
// ✅ Good - MVC separation
import { ApiService } from '../../models/api';
import { useAuth } from '../../controllers/AuthController';

// ❌ Bad - skip MVC layers
// Direct fetch in components
```

## Adding New Features

1. **Data needed?** → Add to `models/`
2. **Logic needed?** → Add to `controllers/`
3. **UI needed?** → Add to `views/`
