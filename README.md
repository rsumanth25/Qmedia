# QMedia – Full Stack Project
## React + Node.js + Express + MongoDB + JWT Auth + Hierarchical Marketplace

---

## Folder Structure

```
qmedia-fullstack/
├── backend/
│   ├── .env                         ← YOUR SECRETS (edit before running)
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── data/
│       │   └── inventoryData.js     ← ADD NEW ADS HERE (Category > AdType > Listings)
│       ├── models/
│       │   ├── User.js
│       │   ├── Cart.js
│       │   └── Order.js
│       ├── middleware/
│       │   └── auth.middleware.js
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── cart.controller.js
│       │   └── order.controller.js
│       └── routes/
│           ├── auth.routes.js
│           ├── cart.routes.js
│           ├── order.routes.js
│           └── media.routes.js      ← /categories + /listings endpoints
│
└── frontend/
    ├── package.json
    └── src/
        ├── App.jsx
        ├── api/api.js               ← Axios with auto JWT
        ├── context/
        │   ├── AuthContext.jsx
        │   └── CartContext.jsx
        ├── components/
        │   ├── Navbar.jsx
        │   ├── CartPanel.jsx
        │   ├── ProtectedRoute.jsx
        │   └── marketplace/
        │       ├── CategorySidebar.jsx
        │       ├── AdTypeTabs.jsx
        │       ├── AdListings.jsx
        │       ├── ListingCard.jsx
        │       └── InteractiveMap.jsx
        └── pages/
            ├── Home.jsx
            ├── Login.jsx
            ├── Register.jsx
            ├── Browse.jsx           ← Main marketplace
            ├── Checkout.jsx
            └── Orders.jsx
```

---

## How to Run

### 1. Backend
```bash
cd backend
npm install
# Edit .env with your MongoDB URI
npm run dev
```
Server runs at: http://localhost:5000

### 2. Frontend
```bash
cd frontend
npm install
npm start
```
App runs at: http://localhost:3000

---

## Marketplace Flow

Airports -> Digital Screens -> Listings + Map markers update
Outdoor  -> Billboard       -> Listings + Map markers update
Cinema   -> Screen Ads      -> Listings + Map markers update
(same logic for all 15 categories)

---

## API Endpoints

GET  /api/health
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me                          (auth required)
GET  /api/media/categories
GET  /api/media/listings?category=Airports&adType=Digital Screens&city=Hyderabad
GET  /api/cart                             (auth required)
POST /api/cart/add                         (auth required)
DELETE /api/cart/remove/:mediaId           (auth required)
DELETE /api/cart/clear                     (auth required)
POST /api/orders/place                     (auth required)
GET  /api/orders/my                        (auth required)
PATCH /api/orders/:id/pay                  (auth required)

---

## Adding New Ads

Open: backend/src/data/inventoryData.js

Add to the correct category listings array:
{
  id: 999,
  title: 'My Billboard',
  adType: 'Billboard',
  location: 'Hyderabad',
  area: 'Hitech City',
  minSpend: 15000,
  price: 15000,
  availability: true,
  lat: 17.4474,
  lng: 78.3762,
  mediaType: 'Outdoor Static'
}

---

## 15 Categories Included

Airports | Outdoor | Cinema | Digital | Radio | Television | BTL
Influencers | Newspaper | Hyperlocal | Sports | Magazine | Digital PR | Airlines | CTV
