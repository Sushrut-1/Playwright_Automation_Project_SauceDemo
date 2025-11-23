@ProductSorting
Feature: SauceDemo Products Sorting
  As a user
  I want to sort products on the homepage
  So that I can view them in the desired order

  Background:
    
    Given I login with username "standard_user" and password "secret_sauce"
    Then I should be on the Products page

  @Sorting
  Scenario: Sort products by Price (low to high)
    When I sort products by "Price (low to high)"
    Then the products should be sorted in ascending order by price

  Scenario: Sort products by Price (high to low)
    When I sort products by "Price (high to low)"
    Then the products should be sorted in descending order by price
