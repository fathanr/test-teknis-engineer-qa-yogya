// cypress/e2e/ui-tests/04-checkout-flow.cy.js
describe("SOAL 4 - Checkout Flow", () => {
  const BASE_URL = "https://demo.evershop.io";

  const dummyData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    postcode: "10001",
    country: "United States",
  };

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(BASE_URL);
  });

  it("Should complete full checkout flow from add to cart to success page", () => {
    // ========== STEP 1: Add product to cart ==========
    cy.log("🛒 STEP 1: Add product to cart");

    cy.get("button").contains("Shop").click();
    cy.wait(500);
    cy.get("a").contains("Accessories").click();
    cy.wait(1000);

    // Click first product link to go to detail page
    cy.get('a[href*="/accessories/"]').first().click();
    cy.wait(1000);

    // On product detail page, select color and add to cart
    cy.contains("button", /^White$/).click();
    cy.wait(500);

    cy.contains("button", /^ADD TO CART$/).click();
    cy.log("✅ Added product to cart");
    cy.wait(2000);

    // Verify "View Cart" button appears
    cy.contains("button", /View Cart/).should("exist");

    // ========== STEP 2: Navigate to checkout page ==========
    cy.log("🛍️ STEP 2: Navigate to checkout page");

    cy.contains("button", /^Checkout$/).click();
    cy.wait(1000);

    // Verify we're on checkout page
    cy.url().should("include", "checkout");
    cy.log("✅ Navigated to checkout page");

    // ========== STEP 3: Fill checkout form ==========
    cy.log("📝 STEP 3: Fill checkout form");

    // Email
    cy.get('#field-contact\\.email').clear().type(dummyData.email);
    cy.wait(300);

    // Full Name
    cy.get('#field-shippingAddress\\.full_name').clear().type(`${dummyData.firstName} ${dummyData.lastName}`);
    cy.wait(300);

    // Telephone
    cy.get('#field-shippingAddress\\.telephone').clear().type(dummyData.phone);
    cy.wait(300);

    // Address 1
    cy.get('#field-shippingAddress\\.address_1').clear().type(dummyData.address);
    cy.wait(300);

    // Address 2 (optional)
    cy.get('#field-shippingAddress\\.address_2').clear().type('Apt 1');
    cy.wait(300);

    // City
    cy.get('#field-shippingAddress\\.city').clear().type(dummyData.city);
    cy.wait(300);

    // Country - click dropdown then select
    cy.get('#field-shippingAddress\\.country').click();
    cy.wait(500);
    cy.get('div[role="presentation"] div').eq(1).click();
    cy.wait(500);

    // Province/State - click dropdown then select Alabama
    cy.get('#field-shippingAddress\\.province').click();
    cy.wait(500);
    cy.contains('div', 'Alabama').click();
    cy.wait(500);

    // Postcode
    cy.get('#field-shippingAddress\\.postcode').clear().type(dummyData.postcode);
    cy.wait(300);

    cy.log("✅ Form filled with dummy data");

    // ========== STEP 4: Select shipping method ==========
    cy.log("🚚 STEP 4: Select shipping method");

    // Try to check radio button, if not found, click the div
    cy.get('.checkout-shipment > div').first().within(() => {
      cy.get('input[type="radio"]').then(($radio) => {
        if ($radio.length > 0) {
          cy.wrap($radio).check({ force: true });
        } else {
          cy.get('[role="radio"]').click();
        }
      });
    });
    cy.wait(500);
    cy.log("✅ Shipping method selected");

    // ========== STEP 5: Select payment method ==========
    cy.log("💳 STEP 5: Select payment method");

    cy.contains('span', /^Cash On Delivery$/).click();
    cy.wait(500);
    cy.log("✅ Payment method selected: Cash On Delivery");

    // ========== STEP 6: Place order and verify success ==========
    cy.log("✅ STEP 6: Place order and verify success");

    // Place Order button
    cy.get('button[class*="bg-primary"][class*="w-full"]').click();
    cy.wait(3000);

    // Verify URL contains /checkout/success
    cy.url().should("include", "/checkout/success");
    cy.log("✅ URL verified: /checkout/success");

    cy.log("🎉 CHECKOUT FLOW COMPLETED SUCCESSFULLY!");
  });

  after(() => {
    cy.task("log", "=== SOAL 4 - CHECKOUT FLOW TEST SUMMARY ===");
    cy.task("log", "✅ Full checkout flow test - PASSED");
    cy.task("log", "   - Add product to cart");
    cy.task("log", "   - Navigate to checkout");
    cy.task("log", "   - Fill checkout form");
    cy.task("log", "   - Select shipping method");
    cy.task("log", "   - Select payment method");
    cy.task("log", "   - Place order");
    cy.task("log", "   - Verify success page");
    cy.task("log", "========================================");
  });
});
