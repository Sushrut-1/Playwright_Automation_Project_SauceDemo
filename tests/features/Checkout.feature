@Checkout @Regression
Feature: Checkout Process
  As a user
  I want to complete purchase
  So that I can successfully place my order

  Background:
    Given I login with username "standard_user" and password "secret_sauce"
    And I add the product "Sauce Labs Backpack" to the cart
    And I navigate to the cart page

  Scenario: Checkout Step One - Missing details validation
    When I click Checkout button
    And I click Continue
    Then I should see an error message "First Name is required"

  Scenario: Successful checkout
    When I click Checkout button
    And I enter First Name "John"
    And I enter Last Name "Doe"
    And I enter Postal Code "411057"
    And I click Continue
    Then I should be on the Overview page
    When I click Finish
    Then I should see the confirmation message "Thank you for your order!"
