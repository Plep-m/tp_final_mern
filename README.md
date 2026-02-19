# Ligue Sportive d'Auvergne - Equipment Rental

**MVC Monorepo** | 1-day project | 3 developers

## Quick Start

```bash
# Install everything
npm run install:all

# Configure environment
# 1. Copy .env.example to .env in both backend/ and frontend/
# 2. Edit backend/.env with your MongoDB URI

# Start development
npm run dev
```

Visit: http://localhost:3000

## Architecture Status

**ARCHITECTURE READY - NOT IMPLEMENTED YET**

All folders, structure, and boilerplate are set up.  
Team can now start implementing features in parallel.

## Structure

```
├── backend/    # Express + MongoDB (MVC)
│   ├── models/      # Mongoose schemas
│   ├── controllers/ # Business logic
│   ├── routes/      # API endpoints
│   └── middleware/  # Auth, validation
│
├── frontend/   # React (MVC)
│   ├── models/      # API calls, data services
│   ├── controllers/ # Auth, business logic
│   └── views/       # React components
│       ├── pages/
│       └── components/
│
└── shared/     # TypeScript types
```

## Stack

- **Backend**: Express + Mongoose + JWT
- **Frontend**: React + native fetch (no Axios/Zustand/Zod)
- **Shared**: TypeScript types only
- **No tests**: 1-day scope

## Environment Setup

Both backend and frontend have `.env.example` files.  
Copy them to `.env` and configure:

**Backend (.env):**
- MONGODB_URI - Your MongoDB Atlas connection string
- JWT_SECRET - Secret key for JWT tokens

**Frontend (.env):**
- VITE_API_URL - Backend API URL (default: http://localhost:5000/api)

## Scripts

```bash
npm run dev              # Start backend + frontend
npm run dev:backend      # Backend only
npm run dev:frontend     # Frontend only
npm run build            # Build all
npm run install:all      # Install + build shared
```

## Team Division

**Dev 1**: Auth + Users  
- Backend: `AuthController`, `UserController`, `User` model
- Frontend: `AuthController`, Login/Register/AdminUsers pages

**Dev 2**: Products  
- Backend: `ProductController`, `Product` model  
- Frontend: Products/AdminProducts pages

**Dev 3**: Orders + Cart  
- Backend: `OrderController`, `Order` model  
- Frontend: Cart/Orders pages, cart service

## Git Structure

All folders preserved with `.gitkeep` files.  
Empty folders will remain in version control.

```bash
git log        # See initial architecture commit
git status     # Check working directory
```

## Next Steps

1. Team members pull the repo
2. Run `npm run install:all`
3. Configure `.env` files
4. Each dev implements their assigned features
5. Test integration as features complete

---

Ready for implementation.

