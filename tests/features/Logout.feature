@Logout @Regression
Feature: Logout Functionality
  As a user
  I want to logout from the application
  So that my session is secured

  Background:
    Given I login with username "standard_user" and password "secret_sauce"

  Scenario: Successful logout
    When I open the menu
    And I click Logout
    Then I should be on the Login page
