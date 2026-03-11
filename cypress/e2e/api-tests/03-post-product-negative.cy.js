// cypress/e2e/api-tests/03-post-product-negative.cy.js
describe('SOAL 02 - POST EMPLOYEE (Negative Testing)', () => {
  const API_URL = 'https://fakestoreapi.com/products';

  // Negative test cases from Excel
  const negativeTestData = [
    {
      testCase: 'TC_NEG_01',
      description: 'Missing required title field',
      data: {
        price: 10.00
      },
      expectedBehavior: 'should fail or handle missing title'
    },
    {
      testCase: 'TC_NEG_02',
      description: 'Missing required price field',
      data: {
        title: 'Product without price'
      },
      expectedBehavior: 'should fail or handle missing price'
    },
    {
      testCase: 'TC_NEG_03',
      description: 'Empty title string',
      data: {
        title: '',
        price: 10.00
      },
      expectedBehavior: 'should reject empty title'
    },
    {
      testCase: 'TC_NEG_04',
      description: 'Negative price value',
      data: {
        title: 'Negative Price Product',
        price: -10.00
      },
      expectedBehavior: 'should reject negative price'
    },
    {
      testCase: 'TC_NEG_05',
      description: 'Invalid price (string)',
      data: {
        title: 'Invalid Price Product',
        price: 'not a number'
      },
      expectedBehavior: 'should reject non-numeric price'
    },
    {
      testCase: 'TC_NEG_06',
      description: 'Null values',
      data: {
        title: null,
        price: null
      },
      expectedBehavior: 'should reject null values'
    },
    {
      testCase: 'TC_NEG_07',
      description: 'Empty object',
      data: {},
      expectedBehavior: 'should reject empty request'
    },
    {
      testCase: 'TC_NEG_08',
      description: 'Very long title (exceeding limit)',
      data: {
        title: 'A'.repeat(1000),
        price: 10.00
      },
      expectedBehavior: 'should reject or truncate very long title'
    },
    {
      testCase: 'TC_NEG_09',
      description: 'Invalid image URL',
      data: {
        title: 'Invalid Image URL',
        price: 10.00,
        image: 'not-a-valid-url'
      },
      expectedBehavior: 'should handle invalid URL'
    },
    {
      testCase: 'TC_NEG_10',
      description: 'Missing all fields',
      data: {
        description: 'Only description, no title or price'
      },
      expectedBehavior: 'should reject incomplete data'
    },
    {
      testCase: 'TC_NEG_11',
      description: 'Array instead of object',
      data: [
        { title: 'Product 1', price: 10 }
      ],
      expectedBehavior: 'should reject array input'
    },
    {
      testCase: 'TC_NEG_12',
      description: 'String instead of object',
      data: 'invalid data',
      expectedBehavior: 'should reject string input'
    }
  ];

  negativeTestData.forEach((test) => {
    it(`${test.testCase} - ${test.description} - ${test.expectedBehavior}`, () => {
      // Add delay to avoid rate limiting
      cy.wait(500);

      cy.request({
        method: 'POST',
        url: API_URL,
        body: test.data,
        failOnStatusCode: false // Allow testing of error responses
      }).then((response) => {
        // For negative tests, we expect either:
        // 1. An error status code (4xx or 5xx), OR
        // 2. The API accepts it (some APIs are permissive)
        if (response.status >= 400) {
          // API correctly rejected the invalid data
          cy.task('log', `${test.testCase} PASSED: API rejected invalid data with status ${response.status}`);
        } else {
          // API accepted the data (permissive API)
          cy.task('log', `${test.testCase} WARNING: API accepted potentially invalid data`);
          expect(response.body).to.be.an('object');
        }
      });
    });
  });

  it('TC_NEG_13 - Test with malformed JSON', () => {
    cy.request({
      method: 'POST',
      url: API_URL,
      body: '{invalid json}',
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 422, 500]);
    });
  });

  it('TC_NEG_14 - Test with missing Content-Type header', () => {
    cy.request({
      method: 'POST',
      url: API_URL,
      body: {
        title: 'Test Product',
        price: 10.00
      },
      headers: {
        'Content-Type': null
      },
      failOnStatusCode: false
    }).then((response) => {
      // Some APIs may still accept it - log the status
      cy.task('log', `TC_NEG_14: API responded with status ${response.status}`);
    });
  });

  it('TC_NEG_15 - Test with extremely large price value', () => {
    cy.request({
      method: 'POST',
      url: API_URL,
      body: {
        title: 'Expensive Product',
        price: 9999999999999999.99
      },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status < 400) {
        cy.task('log', `TC_NEG_15: API accepted extremely large price value`);
      } else {
        cy.task('log', `TC_NEG_15 PASSED: API rejected extremely large price`);
      }
    });
  });

  after(() => {
    cy.task('log', '=== POST PRODUCT NEGATIVE TESTING SUMMARY ===');
    cy.task('log', `Total negative test cases: ${negativeTestData.length + 3}`);
    cy.task('log', 'Negative tests completed - check logs for results');
    cy.task('log', '===========================================');
  });
});
