const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueBtn = page.locator('#continue');
        this.errorMessage = page.locator('.error-message-container h3');
        this.finishBtn = page.locator('#finish');
        this.overviewTitle = page.locator('.title');
        this.successMessage = page.locator('.complete-header');
    }

    async clickContinue() {
        await this.continueBtn.click();
    }

    async enterCheckoutDetails(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async verifyErrorMessage(message) {
        await expect(this.errorMessage).toHaveText(message);
    }

    async verifyOverviewPage() {
        await expect(this.overviewTitle).toHaveText('Checkout: Overview');
    }

    async clickFinish() {
        await this.finishBtn.click();
    }

    async verifySuccessMessage() {
        await expect(this.successMessage).toHaveText('Thank you for your order!');
    }
}

module.exports = CheckoutPage;
