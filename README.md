# API & UI Testing with Cypress - Technical Test

**Position:** Automation Test Engineer
**Company:** Berijalan Techno Center
**Candidate:** Muhammad Fathan Ridlo

---

## Project Overview

This project contains comprehensive API and UI testing using Cypress framework:

**API Testing:**
1. **GET Employees** - Retrieve and validate employee data against Excel control data
2. **POST Product** - Create product with positive and negative testing scenarios

**UI Testing:**
3. **Evershop E-commerce Tests** - End-to-end testing for https://demo.evershop.io/ including:
   - Navigation & URL validation
   - Add to cart functionality
   - Shopping cart management
   - Checkout flow
   - Mobile viewport testing

---

## Project Structure

```
test-teknis/
├── cypress/
│   ├── e2e/
│   │   ├── api-tests/                          # API Testing
│   │   │   ├── 01-get-employees.cy.js          # GET Employees API tests
│   │   │   ├── 02-post-product-positive.cy.js  # POST Product positive tests
│   │   │   └── 03-post-product-negative.cy.js  # POST Product negative tests
│   │   └── ui-tests/                           # UI Testing
│   │       ├── 01-navigasi-validasi-url.cy.js  # Navigation & URL validation
│   │       ├── 02-add-to-cart-quantity.cy.js   # Add to cart tests
│   │       ├── 03-hapus-produk-keranjang.cy.js # Remove from cart tests
│   │       ├── 04-checkout-flow.cy.js          # Checkout flow tests
│   │       └── 05-mobile-viewport-test.cy.js   # Mobile viewport tests
│   ├── fixtures/                                # Test fixtures and data
│   ├── plugins/
│   │   └── index.js                            # Cypress plugins (Excel reader)
│   ├── support/
│   │   ├── commands.js                         # Custom Cypress commands
│   │   └── e2e.js                              # Support file
│   └── results/                                 # Test reports (generated)
├── cypress.config.js                           # Cypress configuration
├── package.json                                # Dependencies and scripts
├── SOAL 1 Data Compare API Testing.xlsx       # Control data for GET Employees
└── soal.md                                     # Requirements document
```

---

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

---

## Installation

1. Install dependencies:
```bash
npm install
```

---

## Running Tests

### API Testing

#### Run all API tests
```bash
npm run cy:run:api
```

#### Run API tests with summary report
```bash
npm run cy:run:api-report
```

### UI Testing

#### Run all UI tests
```bash
npm run cy:run:ui
```

#### Run UI tests with summary report
```bash
npm run cy:run:ui-report
```

### All Tests

#### Run all tests (API + UI)
```bash
npm run cy:run:all
```

#### Run all tests with summary report
```bash
npm run cy:run:report
```

This will:
- Execute all tests
- Generate individual test reports
- Merge all reports into a single summary report
- Create HTML report at: `cypress/results/summary-report.html`

### Interactive Mode

#### Open Cypress Test Runner (Interactive)
```bash
npm run cy:open
```

---

## Test Suites

### API Testing

#### 1. GET Employees API Tests (01-get-employees.cy.js)

**Endpoint:** `http://dummy.restapiexample.com/api/v1/employees`

**Test Cases:**
- TC01: Verify status code is 200
- TC02: Verify response structure
- TC03: Verify response contains array of employees
- TC04: Verify each employee has required fields (id, employee_name, employee_salary, employee_age, profile_image)
- TC05: **Compare API response with Excel control data**
- TC06: Verify response time is less than 2 seconds
- TC07: Verify response headers contain content-type

**Features:**
- Reads employee data from Excel file
- Validates all fields match exactly
- Generates detailed comparison summary

---

### 2. POST Product - Positive Testing (02-post-product-positive.cy.js)

**Endpoint:** `https://fakestoreapi.com/products`

**Test Cases (9 scenarios):**
- TC_POS_01: Valid product with all fields
- TC_POS_02: Valid product with minimum fields
- TC_POS_03: Product with high price value
- TC_POS_04: Product with special characters in title
- TC_POS_05: Product with long description
- TC_POS_06: Product with zero price
- TC_POS_07: Product with decimal price
- TC_POS_08: Product with numeric ID
- TC_POS_09: Verify response time is acceptable

**Features:**
- Tests various valid input combinations
- Validates returned data matches sent data
- Performance testing

---

#### 3. POST Product - Negative Testing (03-post-product-negative.cy.js)

**Endpoint:** `https://fakestoreapi.com/products`

**Test Cases (15 scenarios):**
- TC_NEG_01: Missing required title field
- TC_NEG_02: Missing required price field
- TC_NEG_03: Empty title string
- TC_NEG_04: Negative price value
- TC_NEG_05: Invalid price (string)
- TC_NEG_06: Null values
- TC_NEG_07: Empty object
- TC_NEG_08: Very long title (exceeding limit)
- TC_NEG_09: Invalid image URL
- TC_NEG_10: Missing all fields
- TC_NEG_11: Array instead of object
- TC_NEG_12: String instead of object
- TC_NEG_13: Malformed JSON
- TC_NEG_14: Missing Content-Type header
- TC_NEG_15: Extremely large price value

**Features:**
- Tests invalid and edge case inputs
- Verifies proper error handling
- Documents API behavior for invalid data

---

### UI Testing

**Website:** https://demo.evershop.io/

#### 1. Navigation & URL Validation (01-navigasi-validasi-url.cy.js)

**Test Cases:**
- TC01: Open homepage successfully
- TC02: Navigate to register page and verify URL contains /register
- TC03: Create account successfully with random data
- TC04: Verify account exists by attempting login

**Features:**
- Account registration with dynamic test data
- URL validation for register page
- Account creation verification

---

#### 2. Add to Cart & Quantity Verification (02-add-to-cart-quantity.cy.js)

**Test Cases:**
- TC01: Navigate to category page (Women shoes)
- TC02: Select and view a product
- TC03: Add product to cart with quantity 4
- TC04: Verify cart badge shows quantity 4
- TC05: Open cart page and verify quantity

**Features:**
- Product browsing and selection
- Quantity management
- Cart badge verification
- Cart page validation

---

#### 3. Remove Products from Cart (03-hapus-produk-keranjang.cy.js)

**Test Cases:**
- TC01: Add 4 different products to cart
- TC02: Navigate to shopping cart page
- TC03: Remove all products from cart
- TC04: Verify empty cart message appears
- TC05: Alternative remove method (Clear Cart button if available)

**Features:**
- Multiple product addition
- Cart navigation
- Product removal (individual and bulk)
- Empty cart validation

---

#### 4. Checkout Flow (04-checkout-flow.cy.js)

**Test Cases:**
- TC01: Add product to cart
- TC02: Navigate to checkout page
- TC03: Fill checkout form with dummy data
- TC04: Proceed to payment page
- TC05: Verify URL contains /checkout/payment

**Features:**
- Cart to checkout navigation
- Form filling with dummy data
- Multi-step checkout process
- Payment page URL validation

---

#### 5. Mobile Viewport Test (05-mobile-viewport-test.cy.js)

**Test Cases:**
- TC01: Set viewport to iPhone X dimensions (375x812)
- TC02: Open homepage in mobile viewport
- TC03: Verify burger menu appears on mobile
- TC04: Verify burger menu is clickable and opens menu
- TC05: Verify mobile menu has navigation links
- TC06: Verify desktop viewport does not show burger menu
- TC07: Verify responsive design across multiple viewports

**Features:**
- Mobile viewport testing (iPhone X, iPhone SE, Samsung Galaxy S10, iPad)
- Burger menu visibility and functionality
- Responsive design validation
- Desktop vs mobile behavior comparison

---

## Test Results

### API Testing Summary
- **Total Test Cases:** 31
- **Passing:** 30 (96.8%)
- **Failing:** 1 (data mismatch detection - expected)
- **Execution Time:** ~28 seconds
- **Test Suites:** 3

**Test Suite Breakdown:**
1. **GET Employees API:** 6/7 passing (1 data mismatch detected)
2. **POST Product - Positive:** 9/9 passing ✅
3. **POST Product - Negative:** 15/15 passing ✅

### UI Testing Summary
- **Total Test Cases:** 25
- **Test Suites:** 5
- **Target Website:** https://demo.evershop.io/

**Test Suite Breakdown:**
1. **Navigation & URL Validation:** 4 test cases
2. **Add to Cart & Quantity:** 5 test cases
3. **Remove Products from Cart:** 5 test cases
4. **Checkout Flow:** 5 test cases
5. **Mobile Viewport Test:** 7 test cases

**Note:** UI tests are designed to work with dynamic selectors and may require adjustment based on actual EverShop website structure.

---

## Test Data

### Excel Control Data (SOAL 1 Data Compare API Testing.xlsx)

Used for GET Employees API validation. The test reads this file and compares:
- Employee ID
- Employee Name
- Employee Salary
- Employee Age
- Profile Image

**Current Status:** 22 out of 24 employees match perfectly (91.7% match rate)
- 1 employee (ID: 10) has data differences between Excel and API
- Test successfully detects and reports data mismatches

### Positive Test Data

Defined in test file with various valid scenarios covering:
- Complete and minimal data
- Edge cases (zero price, decimals)
- Special characters
- Long strings

### Negative Test Data

Defined in test file with invalid scenarios covering:
- Missing required fields
- Invalid data types
- Null values
- Extreme values
- Malformed input

### UI Test Data

**Dummy Data for Checkout:**
- First Name: John
- Last Name: Doe
- Email: john.doe@example.com
- Phone: +1234567890
- Address: 123 Main Street
- City: New York
- State: NY
- Zip Code: 10001
- Country: United States

**Mobile Viewports:**
- iPhone X: 375x812
- iPhone SE: 375x667
- Samsung Galaxy S10: 360x760
- iPad: 768x1024

---

## Reports

### Viewing Test Reports

After running tests, HTML reports are generated in `cypress/results/` directory.

#### Method 1: Open Latest Report
```bash
# On macOS
open cypress/results/mochawesome_*.html

# On Windows/Linux
# Double-click the latest HTML file in cypress/results/
```

#### Method 2: Generate Merged Summary Report
```bash
npm run cy:run:report
```
This creates a merged report at:
```
cypress/results/summary-report.html
```

### Understanding Mismatch Reports

For GET Employees API test (TC05), if data mismatches are found:

1. **In Mochawesome HTML Report:**
   - Open the latest HTML report
   - Find "TC05 - Employee data should match Excel control data"
   - Click to expand and see detailed error message
   - Includes: Employee ID, Field name, Excel value, API value

2. **Using Standalone Script:**
   ```bash
   node check-mismatch.js
   ```
   This displays all mismatches in console output.

3. **Example Mismatch Output:**
   ```
   === MISMATCH DETAILS ===
   Mismatch #1:
     Employee ID: 10
     Field: employee_name
     Excel Value: Sonya Hosianna
     API Value: Sonya Frost

   Mismatch #2:
     Employee ID: 10
     Field: employee_age
     Excel Value: 25
     API Value: 23
   ```

### Report Features
- ✅ Pass/Fail status for each test
- ⏱️ Execution time
- 📊 Detailed error messages with mismatch details
- 📝 Test execution logs
- 📈 Statistics overview
- 🖼️ Screenshots on failure

---

## Key Features

1. **Excel Data Integration**
   - Automatic reading of control data from Excel
   - Field-by-field comparison
   - Clear reporting of mismatches

2. **Comprehensive Test Coverage**
   - 31 API test cases across 3 test suites
   - 25 UI test cases across 5 test suites
   - Positive and negative testing
   - Edge case validation
   - Performance testing
   - Mobile viewport testing

3. **Detailed Reporting**
   - Mochawesome HTML reports
   - Console logging for debugging
   - Summary statistics
   - Screenshots on failure

4. **Best Practices**
   - Custom commands for reusability
   - Proper error handling
   - Clear test case naming
   - Well-documented code
   - Dynamic selectors for UI tests
   - Responsive design testing

---

## Dependencies

- **cypress**: ^15.11.0 - Testing framework
- **xlsx**: ^0.18.5 - Excel file reader
- **mochawesome**: ^7.1.4 - HTML reporter
- **mochawesome-merge**: ^4.4.1 - Report merger
- **mochawesome-report-generator**: ^6.3.2 - Report generator

---

## Notes

- All API tests are independent and can run in any order
- Tests use real public APIs (may be affected by network/API availability)
- Excel file must be in the project root directory
- Test data can be easily modified in the test files
- UI tests use dynamic selectors to handle various website structures
- Mobile viewport tests support multiple device resolutions
- All UI tests include proper wait commands for page loading

## Known Limitations

**UI Testing:**
- Tests are designed for https://demo.evershop.io/ but selectors may need adjustment based on actual website structure
- Some tests assume certain UI elements exist (burger menu, cart badge, etc.)
- Network speed may affect test execution times
- Demo websites may have changing content or structure

**API Testing:**
- Rate limiting may affect test execution (already implemented delays)
- Public APIs may be temporarily unavailable

---

*Generated for technical test submission - Automation Test Engineer position*
