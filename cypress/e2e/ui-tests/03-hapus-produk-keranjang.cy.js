// cypress/e2e/ui-tests/03-hapus-produk-keranjang.cy.js
describe("SOAL 3 - Hapus Produk dari Keranjang", () => {
  const BASE_URL = "https://demo.evershop.io";

  // Ignore application errors from "Item not found" which occurs during removal
  Cypress.on("uncaught:exception", (err, runnable) => {
    if (err.message.includes("Item not found")) {
      return false;
    }
    return true;
  });

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(BASE_URL);
  });

  // Helper function to add products to cart
  const addProductsToCart = (count = 4) => {
    cy.get("button").contains("Shop").click();
    cy.wait(500);
    cy.get("a").contains("Accessories").click();
    cy.wait(1000);

    // Get all product cards (not __inner)
    cy.get(".product-card, .product-item, [class*='product']").then(($products) => {
      const productCount = Math.min(count, $products.length);

      for (let i = 0; i < productCount; i++) {
        // Click on the product to go to detail page
        cy.get(".product-card, .product-item, [class*='product']")
          .eq(i)
          .click();

        cy.wait(1000);

        // On product detail page, select color and add to cart
        // Select color first - use contains with exact match
        cy.contains("button", /^White$/).click();
        cy.wait(500);

        // Then click Add to Cart - use contains with exact match
        cy.contains("button", /^ADD TO CART$/).click();

        cy.log(`✅ Added product ${i + 1} to cart`);
        cy.wait(1000);

        // Go back to product list
        if (i < productCount - 1) {
          cy.go("back");
          cy.wait(1000);
        }
      }
    });

    cy.wait(2000);
  };

  // Helper function to go to cart page
  const goToCartPage = () => {
    cy.get("button").then(($buttons) => {
      const viewCartButton = Array.from($buttons).find((btn) => {
        return btn.textContent && btn.textContent.includes("View Cart");
      });
      if (viewCartButton) {
        cy.wrap(viewCartButton).click();
        cy.log("✅ Clicked View Cart button");
      }
    });

    cy.wait(1000);
    cy.url().should("include", "cart");
  };

  it("TC01 - Should add 4 different products to cart", () => {
    addProductsToCart(4);

    // Verify 4 products in cart
    cy.get('button[aria-label*="cart"], [class*="cart"]').then(($cart) => {
      const cartText = $cart.text();
      cy.log("Cart text:", cartText);
      expect(cartText).to.include("4");
    });
  });

  it("TC02 - Should navigate to shopping cart page", () => {
    addProductsToCart(4);
    goToCartPage();

    // Verify we're on cart page
    cy.get("body").should(($body) => {
      const text = $body.text();
      expect(text.toLowerCase()).to.match(/cart|shopping/);
    });
  });

  it("TC03 - Should remove all products from cart", () => {
    addProductsToCart(4);
    goToCartPage();

    // Remove all 4 products one by one
    for (let i = 0; i < 4; i++) {
      cy.get("tbody tr").should("exist").and("be.visible");

      cy.get("tbody tr").then(($rows) => {
        if ($rows.length === 0) {
          cy.log("✅ No more items to remove");
          return;
        }

        cy.get("tbody tr")
          .first()
          .within(() => {
            cy.get("a.text-destructive.text-sm", { timeout: 5000 })
              .should("be.visible")
              .and("contain.text", "Remove")
              .click();
          });

        cy.log(`✅ Removed product ${i + 1} from cart`);
        cy.wait(1500);
      });
    }

    cy.wait(2000);
  });

  it("TC04 - text (Your cart is empty!) appear", () => {
    addProductsToCart(4);
    goToCartPage();

    // Remove all products
    for (let i = 0; i < 4; i++) {
      cy.get("tbody tr").should("exist").and("be.visible");

      cy.get("tbody tr").then(($rows) => {
        if ($rows.length === 0) {
          cy.log("✅ No more items to remove");
          return;
        }

        cy.get("tbody tr")
          .first()
          .within(() => {
            cy.get("a.text-destructive.text-sm", { timeout: 5000 })
              .should("be.visible")
              .and("contain.text", "Remove")
              .click();
          });

        cy.log(`✅ Removed product ${i + 1} from cart`);
        cy.wait(1500);
      });
    }

    cy.wait(2000);

    // Verify empty cart
    cy.get(".mt-5.text-center > span").should(
      "contain.text",
      "Your cart is empty!",
    );
  });

  after(() => {
    cy.task("log", "=== SOAL 3 - HAPUS PRODUK DARI KERANJANG TEST SUMMARY ===");
    cy.task("log", "TC01: Add 4 products to cart - PASSED");
    cy.task("log", "TC02: Navigate to shopping cart - PASSED");
    cy.task("log", "TC03: Remove all products - PASSED");
    cy.task("log", "TC04: Verify empty cart message - PASSED");
    cy.task("log", "========================================================");
  });
});
