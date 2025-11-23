const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// Note: No imports for LoginPage are needed here, as the object is 
// made available via 'this.loginPage' in the hooks.

Given('I am on the SauceDemo login page', async function () {
    await this.loginPage.goto();
    // Asserts a key element on the login page is visible
    await expect(this.page.locator('#user-name')).toBeVisible(); 
});

When('I enter username {string}', async function (username) {
    await this.loginPage.enterUsername(username);
});

When('I enter password {string}', async function (password) {
    await this.loginPage.enterPassword(password);
});

When('I click the Login button', async function () {
    await this.loginPage.clickLogin();
});

Then('I should be navigated to the Products page', async function () {
    // FIX 1: Assert that the URL matches the inventory page
    await expect(this.page).toHaveURL(/.*inventory.html/);
    
    // FIX 2: Assert that a key element (like the page title) is visible
    await expect(this.page.locator('.title')).toBeVisible();
});

Then('the title should be {string}', async function (expectedTitle) {
    // FIX 3: Get the text of the title element and assert it matches the expected value
    const actualTitle = await this.loginPage.getProductsTitleText();
    expect(actualTitle).toBe(expectedTitle);
});

Then('I should see an error message {string}', async function (expectedError) {
    const errorLocator = this.page.locator('[data-test="error"]');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText(expectedError);
});