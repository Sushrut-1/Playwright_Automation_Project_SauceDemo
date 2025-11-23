const { expect } = require('@playwright/test');

class ProductDetailsPage {
    constructor(page) {
        this.page = page;
        this.productTitle = page.locator('.inventory_details_name');
        this.addToCartBtn = page.locator('button[id*="add-to-cart"]');
        this.backToProductsBtn = page.locator('#back-to-products');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async openProduct(itemName) {
        await this.page.locator(`.inventory_item_name:has-text("${itemName}")`).click();
    }

    async verifyProductName(itemName) {
        await expect(this.productTitle).toHaveText(itemName);
    }

    async addToCart() {
        await this.addToCartBtn.click();
    }

    async getCartCount() {
        return await this.cartBadge.textContent();
    }

    async backToProducts() {
        await this.backToProductsBtn.click();
    }
}

module.exports = ProductDetailsPage;
