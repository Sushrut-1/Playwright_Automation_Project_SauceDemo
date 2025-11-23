# Playwright_Automation_Project_SauceDemo
Playwright BDD Framework with JavaScript
CucumberJS + Playwright + Page Object Model

This framework is designed using Playwright, Cucumber (BDD), and JavaScript, following a clean Page Object Model structure.
It supports tag-based execution, debug mode, and modular step definitions.

🚀 Features

✔ Playwright + CucumberJS (BDD)
✔ Page Object Model (POM)
✔ Hooks for browser/session setup
✔ Tag-based execution (@Smoke, @Regression, @AddToCart, etc.)
✔ Modular Step Definitions
✔ Separate feature files for Login, Sorting, Cart, Checkout, Product Details
✔ Debug mode support

📁 Folder Structure
playwright_bdd_framework_with_javascript
│
├── package.json
├── README.md
│
└── tests
      ├── features
      │     ├── Login.feature
      │     ├── ProductSorting.feature
      │     ├── Cart.feature
      │     ├── Checkout.feature
      │     ├── ProductDetails.feature
      │
      ├── pages
      │     ├── loginpage.js
      │     ├── productspage.js
      │     ├── cartpage.js
      │     ├── checkoutpage.js
      │     ├── productdetailspage.js
      │
      ├── steps
      │     ├── loginSteps.js
      │     ├── productSortingSteps.js
      │     ├── cartSteps.js
      │     ├── checkoutSteps.js
      │     ├── productDetailsSteps.js
      │
      └── utils
            └── hooks.js

⚙️ Installation
1️⃣ Install dependencies
npm install

2️⃣ Install Playwright browsers
npx playwright install

▶️ Running Tests
Run all tests
npm test

🎯 Running Tests by Tags
Command	Description
npm run test:smoke	Run @Smoke tests
npm run test:regression	Run @Regression tests
npm run test:product_tag	Run @ProductSorting tests
npm run test:addToCart	Run @AddToCart tests
🎯 Running Specific Features
Command	Runs
npm run test:login	Login.feature
npm run test:sorting	ProductSorting.feature
npm run test:cart	Cart.feature
npm run test:checkout	Checkout.feature
npm run test:productDetails	ProductDetails.feature
🐞 Debug Mode
Debug a single feature
npm run debug:login

Debug everything
npm run debug:all


Attach Chrome DevTools:

chrome://inspect

🔧 Framework Logic Overview
1. Hooks (tests/utils/hooks.js)

Runs Before every scenario:

Launch browser

Create context + page

Attach page objects (this.loginPage, this.productsPage, etc.)

Runs After:

Close browser

2. Page Object Model (POM)

Each page has:

Locators

Page actions

Assertions (optional, usually done in steps)

Example:

class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginBtn = page.locator('#login-button');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(user, pass) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }
}

3. Step Definitions

Steps use the objects created in hooks:

Given('I enter username {string}', async function (username) {
    await this.loginPage.enterUsername(username);
});

4. Feature Files

Each .feature file follows BDD syntax:

@Regression
Scenario: Login with valid user
  Given I am on the SauceDemo login page
  When I enter username "standard_user"
  And I enter password "secret_sauce"
  And I click the Login button
  Then I should be navigated to the Products page

🏗 How to Add a New Feature
Step 1 — Create a .feature file

Example: tests/features/Orders.feature

Step 2 — Add Step Definitions

Create file:
tests/steps/ordersSteps.js

Step 3 — Create Page Objects

Add:
tests/pages/orderspage.js

Step 4 — Run
cucumber-js tests/features/Orders.feature --require tests/steps

💡 Best Practices

✔ Keep locators inside POM
✔ Keep logic inside Page Object functions
✔ Keep verification inside step files
✔ Avoid hard waits (waitForTimeout)
✔ Use cucumber tags to organize execution
