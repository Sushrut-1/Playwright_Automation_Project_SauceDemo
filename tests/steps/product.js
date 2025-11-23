const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');


Given('I login with username {string} and password {string}', async function(username, password) {
    await this.loginPage.goto();
    await this.loginPage.login(username, password);
    //await this.page.pause();  // use this.loginPage
    
});

Then('I should be on the Products page', async function() {
    await expect(this.page).toHaveURL(/.*inventory.html/); // use this.page
    const title = await this.loginPage.getProductsTitleText(); // use this.loginPage
    expect(title).toBe('Products');
});

When('I sort products by {string}', async function(sortOption) {
    await this.productsPage.selectSortOption(sortOption)
});

Then('the products should be sorted in ascending order by price', async function() {
    await this.productsPage.verifyPricesAscending(); // use this.productsPage
});

Then('the products should be sorted in descending order by price', async function() {
    await this.productsPage.verifyPricesDescending(); // use this.productsPage
});
