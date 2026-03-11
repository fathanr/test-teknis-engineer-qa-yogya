# UI Testing Notes - EverShop

## Current Status

### Passing Tests:
- ✅ SOAL 1 - Navigasi & Validasi URL (4/4 passing)
- ✅ SOAL 5 - Mobile Viewport Test (7/7 passing)

### Partially Working:
- ⚠️ SOAL 2 - Add to Cart (2/5 passing)
- ❌ SOAL 3 - Hapus Produk (0/5 passing)
- ❌ SOAL 4 - Checkout Flow (0/5 passing)

## Known Issues

EverShop uses an **API-based cart system**, not traditional form-based submission:
- Add to cart: `POST https://demo.evershop.io/api/cart/mine/items`
- The site doesn't have traditional "Add to Cart" buttons visible in HTML
- Product pages may require user interaction (hover, click variant) to reveal add to cart options

## Selector Findings

### ✅ Working Selectors:
- Product links: `a[href*="/accessories/"]`
- Register page: `/account/register` (via login page link)
- Cart page: `/cart`
- Login URL: `/account/login`
- Cart button: `button[aria-label*="cart"], [class*="cart"]`

### ❌ Missing Elements:
- No visible "Add to Cart" button in static HTML (likely JavaScript-rendered)
- No quantity input on product listing page
- No remove buttons visible in cart HTML
- Cart API requires authentication (customer token)

## Recommendations

For full working tests, would need to:
1. Use API testing for cart operations (cy.request() instead of UI)
2. Implement proper authentication flow
3. Handle JavaScript-rendered elements with proper wait strategies
4. Consider testing via EverShop's documented API endpoints instead of UI

## Total Passing Rate
11/26 tests passing (42%)
