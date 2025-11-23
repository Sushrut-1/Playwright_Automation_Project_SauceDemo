@ProductDetails @Regression
Feature: Product Details Page
  As a user
  I want to view product information
  So that I can understand the product better

  Background:
    Given I login with username "standard_user" and password "secret_sauce"
    And I should be on the Products page

  Scenario: Open product details page
    When I open the product "Sauce Labs Backpack"
    Then the product detail page should show "Sauce Labs Backpack"

  Scenario: Add to cart from product details
    When I open the product "Sauce Labs Backpack"
    And I add the product to the cart
    Then the cart icon should show 1 item
