@AddToCart @Regression
Feature: Add to Cart Functionality
  As a user
  I want to add products to the cart
  So that I can proceed with checkout

  Background:
    Given I login with username "standard_user" and password "secret_sauce"
    And I should be on the Products page

  @AddSingleItem
  Scenario: Add a single product to the cart
    When I add the product "Sauce Labs Backpack" to the cart
    Then the cart icon should show 1 item

  @AddMultipleItems
  Scenario: Add multiple products to the cart
    When I add the following products to the cart:
      | Sauce Labs Backpack  |
      | Sauce Labs Bike Light |
    Then the cart icon should show 2 items

  @RemoveItem
  Scenario: Remove an item from the cart
    When I add the product "Sauce Labs Backpack" to the cart
    And I remove the product "Sauce Labs Backpack" from the cart
    Then the cart icon should show 0 items
