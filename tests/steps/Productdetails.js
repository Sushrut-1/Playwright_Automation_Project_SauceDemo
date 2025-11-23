const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I open the product {string}', async function (productName) {
    await this.productsPage.openProductDetails(productName);
});

Then('the product detail page should show {string}', async function (productName) {
    const title = this.page.locator('.inventory_details_name');
    await expect(title).toHaveText(productName);
});

When('I add the product to the cart', async function () {
    // Use ProductDetailsPage POM if available
    if (this.detailsPage && typeof this.detailsPage.addToCart === 'function') {
        await this.detailsPage.addToCart();
    } else {
        // fallback: click Add to cart on product details
        await this.page.locator('button:has-text("Add to cart")').click();
    }
});

Then('the cart icon should show {int} item', async function (count) {
    // Use ProductsPage.getCartCount (which returns number)
    const actual = await this.productsPage.getCartCount();
    expect(actual).toBe(count);
});
