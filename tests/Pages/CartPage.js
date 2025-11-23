const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItem = (itemName) => page.locator(`.inventory_item_name:has-text("${itemName}")`);
        this.removeButton = (itemName) => page.locator(`button:has-text("Remove")`);
        this.checkoutButton = page.locator('#checkout');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async navigateToCart() {
        await this.page.locator('.shopping_cart_link').click();
    }

    async verifyItemInCart(itemName) {
        await expect(this.cartItem(itemName)).toBeVisible();
    }

    async removeItem(itemName) {
        await this.removeButton(itemName).click();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async getCartCount() {
        return await this.cartBadge.textContent();
    }
}

module.exports = CartPage;
