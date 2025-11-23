@Cart @Regression
Feature: Cart Page Functionality
  As a user
  I want to review my cart
  So that I can ensure correct items before checkout

  Background:
    Given I login with username "standard_user" and password "secret_sauce"
    And I add the product "Sauce Labs Backpack" to the cart

  Scenario: Verify Cart page items
    When I navigate to the cart page
    Then I should see "Sauce Labs Backpack" in the cart

  Scenario: Remove item from the cart page
    When I navigate to the cart page
    And I click remove on "Sauce Labs Backpack"
    Then the cart should be empty
