# API Integration — GearUp Frontend (B7A5)

Maps each frontend component/page to the backend (B7A4) endpoint(s) it consumes.

## Auth

| Frontend | Endpoint | Notes |
|---|---|---|
| `app/auth/login/page.tsx` | `POST /api/auth/login` | Sets `accessToken`/`refreshToken` cookies |
| `app/auth/register/page.tsx` | `POST /api/auth/register` | |
| `lib/auth.ts` → `getCurrentUser` (used by `PublicNavbar`, `middleware.ts`-adjacent role checks, `/gear/[id]`) | `GET /api/auth/me` | Reads `accessToken` cookie, sends `Authorization: Bearer` header |
| `lib/actions/authActions.ts` → `logoutAction` | Clears cookies client-side | No backend call |
| `middleware.ts` | Decodes `accessToken` JWT (no API call) | Role-based route protection for `/dashboard/*` |

## Gear (Public)

| Frontend | Endpoint |
|---|---|
| `app/page.tsx` (home, featured gear) | `GET /api/gear?limit=6` |
| `app/gear/page.tsx` + `components/gear/GearFilters.tsx` | `GET /api/gear` (query: `page`, `limit`, `categoryId`, `brand`, `minPrice`, `maxPrice`, `search`) |
| `app/gear/[id]/page.tsx` | `GET /api/gear/:id` |
| `components/gear/RentGearForm.tsx` (availability check) | `GET /api/gear/:id/availability?startDate=&endDate=` |
| `components/gear/GearFilters.tsx` (category dropdown) | `GET /api/categories` |

## Gear (Provider)

| Frontend | Endpoint |
|---|---|
| `app/dashboard/provider/gear/page.tsx` (`lib/api/gear.ts` → `getMyGears`) | `GET /api/gear/provider/my-gear` |
| `app/dashboard/provider/gear/new/page.tsx` (`createGearAction`) | `POST /api/gear` |
| `app/dashboard/provider/gear/[id]/edit/page.tsx` (`updateGearAction`) | `PUT /api/gear/:id` |
| `components/dashboard/provider/DeleteGearButton.tsx` (`deleteGearAction`) | `DELETE /api/gear/:id` |

## Rental Orders (Customer)

| Frontend | Endpoint |
|---|---|
| `components/gear/RentGearForm.tsx` (`createRentalAction`) | `POST /api/rentals` |
| `app/dashboard/customer/orders/page.tsx` (`getMyOrders`) | `GET /api/rentals/my-orders` |

## Rental Orders (Provider)

| Frontend | Endpoint |
|---|---|
| `app/dashboard/provider/orders/page.tsx` (`getIncomingOrders`) | `GET /api/rentals/provider/incoming` |
| `components/dashboard/provider/OrderStatusActions.tsx` (`updateOrderStatusAction`) | `PATCH /api/rentals/:id/status` |

## Payments (Stripe)

| Frontend | Endpoint |
|---|---|
| `components/dashboard/customer/PayNowButton.tsx` (`createPaymentAction`) | `POST /api/payments/create` |
| `app/dashboard/customer/payments/page.tsx` (`getMyPayments`) | `GET /api/payments` |
| — (Stripe → backend, not called by frontend) | `POST /api/payments/webhook` |
| `app/payment/success/page.tsx`, `app/payment/cancel/page.tsx` | No API call — Stripe `success_url` / `cancel_url` redirects |

## Reviews

| Frontend | Endpoint |
|---|---|
| `components/dashboard/customer/ReviewDialog.tsx` (`createReviewAction`) | `POST /api/reviews` |
| `app/gear/[id]/page.tsx` (`getGearReviews`) | `GET /api/reviews/gear/:gearItemId` |
| `components/dashboard/customer/ReviewDialog.tsx` (`checkReviewedAction`) | `GET /api/reviews/gear/:gearItemId/mine` |

## Admin

| Frontend | Endpoint |
|---|---|
| `app/dashboard/admin/users/page.tsx` (`getAllUsers`) | `GET /api/admin/users` |
| `components/dashboard/admin/UserStatusButton.tsx` (`updateUserStatusAction`) | `PATCH /api/admin/users/:id/status` |
| `app/dashboard/admin/gear/page.tsx` (`getAllGearItems`) | `GET /api/admin/gear` |
| `app/dashboard/admin/orders/page.tsx` (`getAllRentalOrders`) | `GET /api/admin/rentals` |
| `app/dashboard/admin/page.tsx` (Overview stats) | Aggregates `GET /api/admin/users` + `GET /api/admin/gear` + `GET /api/admin/rentals` client-side (no dedicated stats endpoint) |

## Notes

- All authenticated requests send `Authorization: Bearer <accessToken>` from the `accessToken` cookie, read server-side via Next.js Server Actions/Server Components (`next/headers` → `cookies()`).
- `NEXT_PUBLIC_API_URL` env var holds the backend base URL; all `lib/api/*.ts` and `lib/actions/*.ts` files build requests from it.
- Dashboard stat pages (`/dashboard/customer`, `/dashboard/provider`, `/dashboard/admin`) don't call dedicated aggregate endpoints — they fetch the underlying list endpoints (orders, gear, payments, users) and compute counts/sums client-side in the Server Component.
