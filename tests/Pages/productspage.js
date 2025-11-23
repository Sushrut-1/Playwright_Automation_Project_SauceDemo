const { expect } = require('@playwright/test');

class ProductsPage {

    constructor(page) {
        this.page = page;

        // Sorting locators
        this.sortDropdown = page.locator('//select[@data-test="product-sort-container"]');
        this.productPrices = page.locator('.inventory_item_price');

        // Common locators
        this.inventoryItem = ".inventory_item";
        this.cartBadge = ".shopping_cart_badge";
    }

    // -----------------------------
    // 🔹 SORTING FUNCTIONS
    // -----------------------------
    async selectSortOption(option) {
        let value = '';
        switch(option) {
            case 'Price (low to high)': value = 'lohi'; break;
            case 'Price (high to low)': value = 'hilo'; break;
            case 'Name (A to Z)': value = 'az'; break;
            case 'Name (Z to A)': value = 'za'; break;
            default: value = option; // fallback if you use exact option values
        }
        await this.sortDropdown.selectOption(value);
    }

    async getProductPrices() {
        const pricesText = await this.productPrices.allTextContents();
        return pricesText.map(price => parseFloat(price.replace('$', '')));
    }

    async verifyPricesAscending() {
        const prices = await this.getProductPrices();
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);
    }

    async verifyPricesDescending() {
        const prices = await this.getProductPrices();
        const sorted = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sorted);
    }

    // ---------------------------------------
    // 🔹 ADD TO CART / REMOVE / DETAILS
    // ---------------------------------------
    async addProductToCart(productName) {
        const productCard = this.page.locator(this.inventoryItem, { hasText: productName });
        await productCard.locator('button:has-text("Add to cart")').click();
    }

    async removeProductFromCart(productName) {
        const productCard = this.page.locator(this.inventoryItem, { hasText: productName });
        await productCard.locator('button:has-text("Remove")').click();
    }

    async openProductDetails(productName) {
        const productCard = this.page.locator(this.inventoryItem, { hasText: productName });
        // Click the product title link explicitly to avoid strict-mode when multiple anchors exist
        const titleLink = productCard.locator('a[data-test$="title-link"]');
        if (await titleLink.count() > 0) {
            await titleLink.first().click();
        } else {
            // fallback to first anchor in the card
            await productCard.locator('a').first().click();
        }
    }

    async getCartCount() {
        const badge = this.page.locator(this.cartBadge);
        if (await badge.count() === 0) return 0;
        const text = await badge.textContent();
        return Number(text.trim());
    }

    async goToCart() {
        await this.page.locator('.shopping_cart_link').click();
    }
}

module.exports = ProductsPage;
