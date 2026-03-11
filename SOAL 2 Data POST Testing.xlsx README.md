# SOAL 2 - POST Product Test Data Reference

This document describes the test data structure used for POST Product API testing.

## File: SOAL 2 Data POST Testing.xlsx

### Sheet 1: Positive Testing

| Test Case | Title | Price | Description | Category | Image | Expected Status |
|-----------|-------|-------|-------------|----------|-------|-----------------|
| TC_POS_01 | Test Product 1 | 19.99 | This is a test product | electronics | http://example.com/image1.jpg | 200 |
| TC_POS_02 | Minimal Product | 10.00 | | | | 200 |
| TC_POS_03 | Premium Product | 9999.99 | Premium quality product | luxury | | 200 |
| TC_POS_04 | Product @#$ Special & Characters! | 25.50 | Product with special characters | | | 200 |
| TC_POS_05 | Product with Long Description | 15.00 | This is a very long description... | | | 200 |
| TC_POS_06 | Free Product | 0 | Product available for free | | | 200 |
| TC_POS_07 | Precise Price Product | 12.345 | Product with precise decimal pricing | | | 200 |
| TC_POS_08 | Numeric ID Product | 50.00 | | test | | 200 |

### Sheet 2: Negative Testing

| Test Case | Title | Price | Description | Expected Behavior |
|-----------|-------|-------|-------------|-------------------|
| TC_NEG_01 | | 10.00 | | should fail or handle missing title |
| TC_NEG_02 | Product without price | | | should fail or handle missing price |
| TC_NEG_03 | | 10.00 | | should reject empty title |
| TC_NEG_04 | Negative Price Product | -10.00 | | should reject negative price |
| TC_NEG_05 | Invalid Price Product | not a number | | should reject non-numeric price |
| TC_NEG_06 | null | null | | should reject null values |
| TC_NEG_07 | | | | should reject empty request |
| TC_NEG_08 | [1000 characters] | 10.00 | | should reject or truncate very long title |
| TC_NEG_09 | Invalid Image URL | 10.00 | | should handle invalid URL |
| TC_NEG_10 | | | Only description | should reject incomplete data |
| TC_NEG_11 | [Array] | | | should reject array input |
| TC_NEG_12 | [String] | | | should reject string input |

## Note

The test data is already implemented in the test files:
- `cypress/e2e/api-tests/02-post-product-positive.cy.js`
- `cypress/e2e/api-tests/03-post-product-negative.cy.js`

No external Excel file is required for SOAL 2 as the test data is hardcoded in the test files.
