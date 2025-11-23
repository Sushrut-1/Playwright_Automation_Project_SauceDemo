Feature: SauceDemo Login Functionality
  As a user of SauceDemo
  I want to login with valid credentials
  So that I can access the product dashboard

  Background:
    Given I am on the SauceDemo login page

@Regression
Scenario: Login with valid username and valid password
  When I enter username "standard_user"
  And I enter password "secret_sauce"
  And I click the Login button
  Then I should be navigated to the Products page
  And the title should be "Products"

@Regression
Scenario: Login with locked_out_user account
  When I enter username "locked_out_user"
  And I enter password "secret_sauce"
  And I click the Login button
  Then I should see an error message "Sorry, this user has been locked out."

@Regression
Scenario: Login with valid username and invalid password
  When I enter username "standard_user"
  And I enter password "wrong_password"
  And I click the Login button
  Then I should see an error message "Username and password do not match"

@Regression
Scenario: Login with invalid username and valid password
  When I enter username "wrong_user"
  And I enter password "secret_sauce"
  And I click the Login button
  Then I should see an error message "Username and password do not match"

@Smoke
Scenario: Login with empty username and empty password
  When I click the Login button
  Then I should see an error message "Username is required"

Scenario: Login with username only
  When I enter username "standard_user"
  And I click the Login button
  Then I should see an error message "Password is required"

Scenario: Login with password only
  When I enter password "secret_sauce"
  And I click the Login button
  Then I should see an error message "Username is required"

Scenario: Login using case-sensitive username check
  When I enter username "Standard_User"
  And I enter password "secret_sauce"
  And I click the Login button
  Then I should see an error message "Username and password do not match"
