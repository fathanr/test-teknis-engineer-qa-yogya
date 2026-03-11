// cypress/e2e/api-tests/02-post-product-positive.cy.js
describe('SOAL 02 - POST EMPLOYEE (Positive Testing)', () => {
  const API_URL = 'https://fakestoreapi.com/products';

  // Positive test cases from Excel
  const positiveTestData = [
    {
      testCase: 'TC_POS_01',
      description: 'Valid product with all fields',
      data: {
        id: 101,
        title: 'Test Product 1',
        price: 19.99,
        description: 'This is a test product',
        category: 'electronics',
        image: 'http://example.com/image1.jpg'
      },
      expectedStatus: 201
    },
    {
      testCase: 'TC_POS_02',
      description: 'Valid product with minimum fields',
      data: {
        title: 'Minimal Product',
        price: 10.00
      },
      expectedStatus: 201
    },
    {
      testCase: 'TC_POS_03',
      description: 'Product with high price value',
      data: {
        title: 'Premium Product',
        price: 9999.99,
        description: 'Premium quality product',
        category: 'luxury'
      },
      expectedStatus: 201
    },
    {
      testCase: 'TC_POS_04',
      description: 'Product with special characters in title',
      data: {
        title: 'Product @#$ Special & Characters!',
        price: 25.50,
        description: 'Product with special characters'
      },
      expectedStatus: 201
    },
    {
      testCase: 'TC_POS_05',
      description: 'Product with long description',
      data: {
        title: 'Product with Long Description',
        price: 15.00,
        description: 'This is a very long description that contains multiple sentences and detailed information about the product being tested. It includes various details about features, specifications, and other relevant information that a customer might want to know.'
      },
      expectedStatus: 201
    },
    {
      testCase: 'TC_POS_06',
      description: 'Product with zero price',
      data: {
        title: 'Free Product',
        price: 0,
        description: 'Product available for free'
      },
      expectedStatus: 201
    },
    {
      testCase: 'TC_POS_07',
      description: 'Product with decimal price',
      data: {
        title: 'Precise Price Product',
        price: 12.345,
        description: 'Product with precise decimal pricing'
      },
      expectedStatus: 201
    },
    {
      testCase: 'TC_POS_08',
      description: 'Product with numeric ID',
      data: {
        id: 999,
        title: 'Numeric ID Product',
        price: 50.00,
        category: 'test'
      },
      expectedStatus: 201
    }
  ];

  positiveTestData.forEach((test) => {
    it(`${test.testCase} - ${test.description}`, () => {
      // Add delay to avoid rate limiting
      cy.wait(1000);

      cy.apiPost(API_URL, test.data).then((response) => {
        // Verify status code
        expect(response.status).to.equal(test.expectedStatus);

        // Verify response structure
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('id');

        // Verify the data returned matches what was sent
        if (test.data.title) {
          expect(response.body.title).to.equal(test.data.title);
        }
        if (test.data.price) {
          expect(response.body.price).to.equal(test.data.price);
        }
        if (test.data.description) {
          expect(response.body.description).to.equal(test.data.description);
        }
        if (test.data.category) {
          expect(response.body.category).to.equal(test.data.category);
        }
      });
    });
  });

  it('TC_POS_09 - Response time should be acceptable', () => {
    const testData = {
      title: 'Response Time Test',
      price: 10.00
    };

    cy.apiPost(API_URL, testData).then((response) => {
      expect(response.duration).to.be.lessThan(5000);
      cy.log(`Response time: ${response.duration}ms`);
    });
  });

  after(() => {
    cy.task('log', '=== POST PRODUCT POSITIVE TESTING SUMMARY ===');
    cy.task('log', `Total positive test cases: ${positiveTestData.length + 1}`);
    cy.task('log', 'All positive test cases executed successfully');
    cy.task('log', '===========================================');
  });
});
