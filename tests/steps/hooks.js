const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

// Page Objects
const LoginPage = require('../Pages/loginpage');
const ProductsPage = require('../Pages/productspage');
const CartPage = require('../Pages/CartPage');
const CheckoutPage = require('../Pages/CheckoutPage');
const ProductDetailsPage = require('../Pages/ProductDetailsPage');
const MenuPage = require('../Pages/MenuPage');

// Increase default cucumber step timeout to 60s
setDefaultTimeout(60 * 1000);

Before(async function () {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    // Set page-level default timeout higher to avoid navigation timeouts
    this.page.setDefaultTimeout(30 * 1000);

    // Initialize all POMs here
    this.loginPage = new LoginPage(this.page);
    this.productsPage = new ProductsPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.detailsPage = new ProductDetailsPage(this.page);
    this.menuPage = new MenuPage(this.page);
});

After(async function () {
    if (this.browser) {
        await this.browser.close();
    }
});
