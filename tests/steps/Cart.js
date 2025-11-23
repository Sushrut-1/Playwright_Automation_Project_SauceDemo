const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I add the product {string} to the cart', async function (productName) {
    // use POM attached in hooks: this.productsPage
    await this.productsPage.addProductToCart(productName);
});

When('I add the following products to the cart:', async function (dataTable) {
    const rows = dataTable.raw().flat();
    for (const name of rows) {
        await this.productsPage.addProductToCart(name);
    }
});

When('I remove the product {string} from the cart', async function (productName) {
    // Prefer using CartPage if you navigate to cart - but ProductsPage has remove too
    await this.productsPage.removeProductFromCart(productName);
});

Then('the cart icon should show {int} item', async function (count) {
    const actual = await this.productsPage.getCartCount();
    expect(actual).toBe(count);
});

// Then('the cart icon should show {int} items', async function (count) {
//     // alias for plural in features
//     const actual = await this.productsPage.getCartCount();
//     expect(actual).toBe(count);
// });

// Navigate to cart page step (used in Checkout & Cart features)
When('I navigate to the cart page', async function () {
    await this.productsPage.goToCart();
});

// Verify item in cart (used in Cart.feature)
Then('I should see {string} in the cart', async function (productName) {
    const itemLocator = this.page.locator('.cart_item .inventory_item_name', { hasText: productName });
    await expect(itemLocator).toBeVisible();
});

// Click remove on cart page (if you want to remove using CartPage functionality)
When('I click remove on {string}', async function (productName) {
    // The CartPage may contain a remove function — use it if present
    if (this.cartPage && typeof this.cartPage.removeItem === 'function') {
        await this.cartPage.removeItem(productName);
    } else {
        // Fallback: click remove button for item on cart page
        const removeBtn = this.page.locator('.cart_item', { hasText: productName }).locator('button:has-text("Remove")');
        await removeBtn.click();
    }
});

// Validate cart is empty
Then('the cart should be empty', async function () {
    await expect(this.page.locator('.cart_item')).toHaveCount(0);
});
