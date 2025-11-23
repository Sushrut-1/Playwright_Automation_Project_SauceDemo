const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I open the side menu', async function () {
    await this.menuPage.openMenu();
});

When('I click Logout from menu', async function () {
    await this.menuPage.clickLogout();
});

Then('I should land on the Login page', async function () {
    await expect(this.page).toHaveURL(/.*saucedemo.com\//);
    await expect(this.page.locator('#login-button')).toBeVisible();
});
