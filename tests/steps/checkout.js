const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I click Checkout button', async function () {
    // Using CartPage.clickCheckout if present, else click the checkout button selector
    if (this.cartPage && typeof this.cartPage.clickCheckout === 'function') {
        await this.cartPage.clickCheckout();
    } else {
        await this.page.locator('#checkout').click();
    }
});

When('I click Continue', async function () {
    await this.page.locator('#continue').click();
});

When('I enter First Name {string}', async function (firstName) {
    await this.page.locator('#first-name').fill(firstName);
});

When('I enter Last Name {string}', async function (lastName) {
    await this.page.locator('#last-name').fill(lastName);
});

When('I enter Postal Code {string}', async function (postalCode) {
    await this.page.locator('#postal-code').fill(postalCode);
});

Then('I should be on the Overview page', async function () {
    await expect(this.page).toHaveURL(/.*checkout-step-two/);
    await expect(this.page.locator('.title')).toHaveText('Checkout: Overview');
});

When('I click Finish', async function () {
    await this.page.locator('#finish').click();
});

Then('I should see the confirmation message {string}', async function (msg) {
    await expect(this.page.locator('.complete-header')).toHaveText(msg);
});

// *** NOTE: renamed step to avoid clash with login error message step ***
Then('I should see a checkout error {string}', async function (expected) {
    const locator = this.page.locator('[data-test="error"]');
    await expect(locator).toBeVisible();
    await expect(locator).toContainText(expected);
});
