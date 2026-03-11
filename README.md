# API Testing with Cypress - Technical Test

**Position:** Automation Test Engineer
**Company:** Berijalan Techno Center
**Candidate:** [Your Name]

---

## Project Overview

This project contains comprehensive API testing using Cypress framework for two main endpoints:

1. **GET Employees** - Retrieve and validate employee data against Excel control data
2. **POST Product** - Create product with positive and negative testing scenarios

---

## Project Structure

```
test-teknis/
├── cypress/
│   ├── e2e/
│   │   └── api-tests/
│   │       ├── 01-get-employees.cy.js          # GET Employees API tests
│   │       ├── 02-post-product-positive.cy.js  # POST Product positive tests
│   │       └── 03-post-product-negative.cy.js  # POST Product negative tests
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

### Option 1: Run all API tests
```bash
npm run cy:run:api
```

### Option 2: Run tests with summary report
```bash
npm run cy:run:report
```

This will:
- Execute all API tests
- Generate individual test reports
- Merge all reports into a single summary report
- Create HTML report at: `cypress/results/summary-report.html`

### Option 3: Open Cypress Test Runner (Interactive)
```bash
npm run cy:open
```

---

## Test Suites

### 1. GET Employees API Tests (01-get-employees.cy.js)

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

### 3. POST Product - Negative Testing (03-post-product-negative.cy.js)

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

## Test Results

### Latest Test Run Summary
- **Total Test Cases:** 31
- **Passing:** 30 (96.8%)
- **Failing:** 1 (data mismatch detection - expected)
- **Execution Time:** ~28 seconds
- **Test Suites:** 3

### Test Suite Breakdown
1. **GET Employees API:** 6/7 passing (1 data mismatch detected)
2. **POST Product - Positive:** 9/9 passing ✅
3. **POST Product - Negative:** 15/15 passing ✅

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
   - 31 test cases across 3 test suites
   - Positive and negative testing
   - Edge case validation
   - Performance testing

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

---

## Submission

**Email to:** mutiaraceasagusta@berijalan.co.id
**Subject:** TEST*AUTOMATION*[your name]

**Attachments:**
1. This project (ZIP format)
2. Summary report (cypress/results/summary-report.html)
3. Any additional documentation

---

## Contact

For questions or clarifications about this test project, please contact:
- **Email:** mutiaraceasagusta@berijalan.co.id
- **Position:** Automation Test Engineer
- **Company:** Berijalan Techno Center

---

*Generated for technical test submission*
