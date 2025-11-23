class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
    this.productsTitle = page.locator('.title');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async enterUsername(username) {
    await this.username.fill(username);
  }

  async enterPassword(password) {
    await this.password.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async getProductsTitleText() {
    return await this.productsTitle.textContent();
  }

  async getErrorMessageText() {
    return await this.errorMessage.textContent();
  }
}

module.exports = LoginPage;  // <--- Use module.exports, not export default
