// cypress/e2e/ui-tests/explore-website.cy.js
describe('Explore EverShop Website Structure', () => {
  const BASE_URL = 'https://demo.evershop.io';

  it('Should explore homepage elements', () => {
    cy.visit(BASE_URL);
    cy.wait(2000);

    // Log all links
    cy.get('a').each(($link) => {
      const text = $link.text().trim();
      const href = $link.attr('href');
      if (text && href) {
        cy.log(`Link: "${text}" -> ${href}`);
      }
    });

    // Log all buttons
    cy.get('button').each(($btn) => {
      const text = $btn.text().trim();
      const type = $btn.attr('type');
      const classList = $btn.attr('class');
      if (text) {
        cy.log(`Button: "${text}", type: ${type}, class: ${classList}`);
      }
    });

    // Log all forms
    cy.get('form').each(($form) => {
      const action = $form.attr('action');
      const method = $form.attr('method');
      cy.log(`Form: action=${action}, method=${method}`);
    });

    // Log all input fields
    cy.get('input').each(($input) => {
      const type = $input.attr('type');
      const name = $input.attr('name');
      const placeholder = $input.attr('placeholder');
      const classList = $input.attr('class');
      cy.log(`Input: type=${type}, name=${name}, placeholder=${placeholder}, class=${classList}`);
    });
  });

  it('Should explore register page', () => {
    // Try different possible register URLs
    const registerUrls = [
      '/account/register',
      '/register',
      '/customer/account/create',
      '/account/create',
      '/signup'
    ];

    registerUrls.forEach((url) => {
      cy.visit(`${BASE_URL}${url}`, { failOnStatusCode: false });
      cy.wait(1000);

      cy.get('body').then(($body) => {
        const hasForm = $body.find('form').length > 0;
        const hasInput = $body.find('input[type="email"], input[type="text"]').length > 0;
        const hasButton = $body.find('button[type="submit"]').length > 0;

        if (hasForm && hasInput) {
          cy.log(`✅ Found register page at: ${url}`);

          // Log form fields
          cy.get('input').each(($input) => {
            const type = $input.attr('type');
            const name = $input.attr('name');
            const placeholder = $input.attr('placeholder');
            cy.log(`  - Input: type=${type}, name=${name}, placeholder=${placeholder}`);
          });
        }
      });
    });
  });

  it('Should explore product listing', () => {
    cy.visit(BASE_URL);
    cy.wait(2000);

    // Click on Women shoes
    cy.contains('Women').click();
    cy.wait(2000);

    // Log product cards
    cy.get('.product, [class*="product"], .item, [class*="item"]').each(($product) => {
      const classList = $product.attr('class');
      const html = $product.html();
      cy.log(`Product class: ${classList}`);
    });

    // Log all add to cart buttons
    cy.get('button:contains("Add"), button:contains("Cart"), button:contains("Buy")').each(($btn) => {
      const text = $btn.text().trim();
      const classList = $btn.attr('class');
      cy.log(`Add to cart button: "${text}", class: ${classList}`);
    });
  });

  it('Should explore cart elements', () => {
    cy.visit(BASE_URL);
    cy.wait(1000);

    // Look for cart icon/link
    cy.get('a[href*="cart"], [class*="cart"], [class*="basket"]').each(($cart) => {
      const text = $cart.text().trim();
      const href = $cart.attr('href');
      const classList = $cart.attr('class');
      cy.log(`Cart element: text="${text}", href=${href}, class=${classList}`);
    });
  });

  it('Should explore mobile menu', () => {
    cy.viewport(375, 812); // iPhone X
    cy.visit(BASE_URL);
    cy.wait(2000);

    // Log all buttons that might be menu buttons
    cy.get('button').each(($btn) => {
      const ariaLabel = $btn.attr('aria-label');
      const classList = $btn.attr('class');
      const text = $btn.text().trim();

      if (ariaLabel && (ariaLabel.includes('menu') || ariaLabel.includes('Menu'))) {
        cy.log(`Burger menu found: aria-label="${ariaLabel}", class="${classList}"`);
      }

      if (classList && (classList.includes('menu') || classList.includes('burger') || classList.includes('hamburger'))) {
        cy.log(`Menu button found: class="${classList}", text="${text}"`);
      }
    });
  });
});
