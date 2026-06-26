# QMedia Fullstack Project Documentation

## 1. Project Overview
This project is a full-stack advertising media marketplace built with:
- Frontend: React + React Router
- Backend: Node.js + Express
- Database: MongoDB (via Mongoose)
- Client-server communication: Axios with JWT authentication

The app allows users to browse live ad inventory, add items to a cart, register/login, place orders, and view past orders.

## 2. Architecture Summary

### Frontend
- `frontend/src/App.jsx` — root app defines routing and providers.
- `frontend/src/api/api.js` — Axios instance with JWT token injection.
- `frontend/src/context/AuthContext.jsx` — login/register/auth state.
- `frontend/src/context/CartContext.jsx` — cart state and sync with backend.
- `frontend/src/pages/*` — page-level views like Home, Browse, Checkout, Orders, Login, Register.
- `frontend/src/components/*` — reusable UI components: Navbar, CartDrawer, HeroSection, marketplace listings.

### Backend
- `backend/src/server.js` — Express server, middleware, and route registration.
- `backend/src/routes/*` — route definitions for auth, cart, orders, media.
- `backend/src/controllers/*` — controller logic for each route.
- `backend/src/models/*` — MongoDB schemas for User, Cart, Order.
- `backend/src/data/inventoryData.js` — mock inventory dataset used by media routes.

## 3. Key Data Flow

### Authentication flow
1. User submits login/register form.
2. Frontend calls `/api/auth/login` or `/api/auth/register`.
3. Backend creates/verifies the user and returns JWT.
4. Frontend stores JWT in `localStorage` under `qmedia_token`.
5. All future API requests automatically include `Authorization: Bearer <token>`.

### Cart flow
1. When logged in, cart is fetched from `/api/cart`.
2. Add/remove actions update MongoDB via `/api/cart/add`, `/api/cart/remove/:mediaId`, `/api/cart/clear`.
3. Cart total values are calculated on the frontend using cart items.

### Order flow
1. Checkout page posts to `/api/orders/place`.
2. Backend creates an Order document and clears the cart.
3. The Orders page fetches `/api/orders/my` to display placed orders.

## 4. Frontend Button-to-Function Mapping

### Navbar buttons
- `Cart` button in `frontend/src/components/Navbar.jsx`
  - `onClick={() => setCartOpen(v => !v)}` toggles the cart drawer open state.
- `My Orders` link
  - `<Link to="/orders">` navigates to orders page.
- `Logout` button
  - Calls `handleLogout()` → `logout()` from `AuthContext` → removes JWT and user state → navigates to `/`.

### Cart drawer buttons
- Close button (`✕`)
  - `onClick={() => setCartOpen(false)}` hides cart drawer.
- Remove item button
  - `onClick={() => removeItem(item.mediaId)}` calls `CartContext.removeItem()` → backend DELETE `/api/cart/remove/:mediaId`.
- Proceed to Checkout
  - If logged in: `navigate('/checkout')`.
  - If not logged in: `navigate('/login')`.

### Home page actions (`frontend/src/pages/Home.jsx`)
- `HeroSection` search button
  - Triggers `handleSearchSubmit(query)` → updates `searchQuery` and maybe category; scrolls to marketplace.
- `HeroSection` category chips
  - Each click calls `handleCategorySelect(item)` → sets `selectedCat`, resets filters, scrolls to marketplace.
- `Start Now` button in hero card
  - `onClick={() => onSearch(query || 'Airports')}` triggers same search logic.
- `Open Dashboard` button
  - `onClick={scrollToMarketplace}` scrolls to marketplace section.

### Marketplace filters in Home/Browse
- Category sidebar buttons (`CategorySidebar.jsx`)
  - `onSelect(cat.category)` calls `handleCatSelect()` → sets `selectedCat`, resets ad type and filters.
- Ad type tabs (`AdTypeTabs.jsx`)
  - Clicking a tab calls `onSelect(type)` or `onSelect('All')` → updates `selectedAdType`.
- City filter buttons in `AdListings.jsx`
  - `onClick={() => onCityChange(...)}` updates `cityFilter`.

### Listing actions
- `+ Cart` / `✓ Added` button in `ListingCard.jsx`
  - `onClick={() => listing.availability && onToggleCart(listing)}`
  - In `Home.jsx` / `Browse.jsx`, `onToggleCart(listing)` uses `CartContext`.
    - If item not in cart: `addItem(item)` → POST `/api/cart/add`.
    - If item already in cart: `removeItem(listing.id)` → DELETE `/api/cart/remove/:mediaId`.
- Wishlist heart button in `ListingCard.jsx`
  - Local UI state only (`wished`), toggles heart icon and does not call backend.

### Map popup button
- `Add to Cart` button in `InteractiveMap.jsx`
  - `onClick={() => item.availability && onAddToCart(item)}`
  - Adds listing to cart via same `onToggleCart` pipeline.

### Browse page actions (`frontend/src/pages/Browse.jsx`)
- Category search input changes update `catSearch` state.
- Category button selects category and refreshes listings.
- Checkout link at bottom of cart summary is `<a href="/checkout">`.

### Checkout page actions
- `Confirm & Place Order` button
  - `onClick={placeOrder}` in `frontend/src/pages/Checkout.jsx`.
  - `placeOrder()` posts to `/api/orders/place`, clears cart, shows success state, then navigates to `/orders`.

### Orders page actions
- `+ New Campaign` link to `/browse`.
- Orders page only displays data; no backend-changing button is present.

### Auth pages
- Login form submit in `Login.jsx`
  - `handleSubmit()` calls `login(form.email, form.password)` from `AuthContext`.
  - `AuthContext.login()` posts to `/api/auth/login`, stores token, sets user state.
- Register form submit in `Register.jsx`
  - `handleSubmit()` calls `register()` from `AuthContext`.
  - `AuthContext.register()` posts to `/api/auth/register`, stores token, sets user state.

## 5. Important Frontend Functions and Where They Live

### `frontend/src/api/api.js`
- Creates Axios instance with `baseURL: '/api'`.
- Adds request interceptor that reads `qmedia_token` from `localStorage`.
- Automatically includes an `Authorization` header for protected endpoints.

### `frontend/src/context/AuthContext.jsx`
- `login(email, password)` → `POST /api/auth/login`
- `register(name, email, password, phone, company)` → `POST /api/auth/register`
- `logout()` clears auth state and stored token.
- On startup, calls `GET /api/auth/me` if a token exists.

### `frontend/src/context/CartContext.jsx`
- `addItem(item)` → `POST /api/cart/add`
- `removeItem(mediaId)` → `DELETE /api/cart/remove/:mediaId`
- `clearCart()` → `DELETE /api/cart/clear`
- Loads cart from `GET /api/cart` when user is authenticated.

## 6. Backend Route Summary

### Auth routes (`backend/src/routes/auth.routes.js`)
- `POST /api/auth/register` → `auth.controller.register`
- `POST /api/auth/login` → `auth.controller.login`
- `GET /api/auth/me` → protected by auth middleware, returns current user.

### Cart routes (`backend/src/routes/cart.routes.js`)
- All routes protected by auth middleware.
- `GET /api/cart` → `cart.controller.getCart`
- `POST /api/cart/add` → `cart.controller.addItem`
- `DELETE /api/cart/remove/:mediaId` → `cart.controller.removeItem`
- `DELETE /api/cart/clear` → `cart.controller.clearCart`

### Order routes (`backend/src/routes/order.routes.js`)
- All routes protected by auth middleware.
- `POST /api/orders/place` → `order.controller.placeOrder`
- `GET /api/orders/my` → `order.controller.getMyOrders`
- `GET /api/orders/:id` → `order.controller.getOrder`
- `PATCH /api/orders/:id/pay` → `order.controller.markPaid`

### Media routes (`backend/src/routes/media.routes.js`)
- `GET /api/media/categories` → returns inventory categories.
- `GET /api/media/listings` → returns listings filtered by `category`, `adType`, and `city`.
- `GET /api/media` → legacy route returning all media.

## 7. Backend Controller Behavior

### `auth.controller.js`
- `register` creates a new user, hashes password, returns JWT and user profile.
- `login` validates email and password, returns JWT and user profile.
- `getMe` reads `req.user` from auth middleware and returns it.

### `cart.controller.js`
- `getCart` finds the cart document for the user.
- `addItem` creates cart if missing and appends a unique listing.
- `removeItem` filters item by `mediaId`.
- `clearCart` empties the cart.

### `order.controller.js`
- `placeOrder` reads cart items, computes subtotal/gst/grandTotal, writes an Order, clears the cart.
- `getMyOrders` returns all orders for the user.
- `markPaid` updates order status to `paid` once payment is complete.
- `getOrder` returns a single order detail.

## 8. Data Models

### User (`backend/src/models/User.js`)
- Fields: `name`, `email`, `password`, `phone`, `company`, `createdAt`.
- Passwords are hashed before save.

### Cart (`backend/src/models/Cart.js`)
- One cart document per user.
- `items` contain `mediaId`, `name`, `type`, `vendor`, `city`, `price`, `planPrice`.

### Order (`backend/src/models/Order.js`)
- Stores ordered items, totals, status, paymentId.
- Status values: `pending`, `paid`, `failed`.

## 9. Button Action Examples

### Example: Clicking `+ Cart` on a listing
1. `ListingCard.jsx` calls `onToggleCart(listing)`.
2. `Home.jsx` or `Browse.jsx` checks if the item exists in cart.
3. If not in cart, `CartContext.addItem()` calls backend `POST /api/cart/add`.
4. Cart state updates, UI changes button text to `✓ Added`.

### Example: Clicking `Proceed to Checkout` in the cart drawer
1. `CartDrawer.jsx` calls `handleCheckout()`.
2. If user is authenticated, route changes to `/checkout`.
3. If not authenticated, route changes to `/login`.

### Example: Clicking `Confirm & Place Order`
1. `Checkout.jsx` calls `placeOrder()`.
2. `api.post('/orders/place')` sends current cart to backend.
3. Backend creates an order and clears the cart.
4. Frontend clears cart state and redirects to `/orders` after success.

## 10. Notes on Protected Routes
- `Checkout` and `Orders` pages are wrapped in `ProtectedRoute.jsx`.
- `ProtectedRoute` checks `user` from `AuthContext`.
- If not logged in, it redirects visitors to `/login`.

## 11. Startup Behavior
- Frontend initializes `AuthContext` and `CartContext`.
- If a JWT exists, `AuthContext` loads current user from `/api/auth/me`.
- If user is authenticated, `CartContext` loads items from `/api/cart`.
- `Home.jsx` fetches categories from `/api/media/categories` and listings from `/api/media/listings`.

---

This document explains the main UI buttons, the exact functions they call, and the backend endpoints they use. If you want, I can also add a second document that diagrams the full request-response flow visually.