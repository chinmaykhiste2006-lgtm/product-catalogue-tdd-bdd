Feature: Product catalogue administration
  Background:
    Given the following products
      | name    | description     | price  | category   | available |
      | Hat     | A red fedora    | 59.95  | Cloths     | true      |
      | Shoes   | Running shoes   | 79.95  | Cloths     | false     |
      | Big Mac | Food item       | 4.99   | Food       | true      |
      | Sheets  | Cotton sheets   | 19.99  | Housewares | true      |

  Scenario: Read a Product
    When I visit the "Home Page"
    And I set the "Name" field to "Hat"
    And I press the "Search" button
    Then I should see the message "Success"
    And I should see "Hat" in the results
    When I copy the "Id" of "Hat" from the results
    And I press the "Clear" button
    And I paste the copied ID into the "Id" field
    And I press the "Retrieve" button
    Then I should see the message "Success"
    And I should see "Hat" in the "Name" field
    And I should see "A red fedora" in the "Description" field
    And I should see "59.95" in the "Price" field
    And I should see "Cloths" in the "Category" dropdown
    And I should see "True" in the "Available" dropdown

  Scenario: Update a Product
    When I visit the "Home Page"
    And I set the "Name" field to "Hat"
    And I press the "Search" button
    Then I should see the message "Success"
    And I should see "Hat" in the results
    When I copy the "Id" of "Hat" from the results
    And I press the "Clear" button
    And I paste the copied ID into the "Id" field
    And I press the "Retrieve" button
    And I set the "Name" field to "Fedora"
    And I press the "Update" button
    Then I should see the message "Success"
    When I press the "Clear" button
    And I paste the copied ID into the "Id" field
    And I press the "Retrieve" button
    Then I should see "Fedora" in the "Name" field
    When I press the "Clear" button
    And I set the "Name" field to "Fedora"
    And I press the "Search" button
    Then I should see "Fedora" in the results
    And I should not see "Hat" in the results

  Scenario: Delete a Product
    When I visit the "Home Page"
    And I set the "Name" field to "Hat"
    And I press the "Search" button
    Then I should see "Hat" in the results
    When I copy the "Id" of "Hat" from the results
    And I press the "Clear" button
    And I paste the copied ID into the "Id" field
    And I press the "Delete" button
    Then I should see the message "Product has been Deleted!"
    When I press the "Clear" button
    And I press the "Search" button
    Then I should not see "Hat" in the results

  Scenario: List all products
    When I visit the "Home Page"
    And I press the "Clear" button
    And I press the "Search" button
    Then I should see the message "Success"
    And I should see "Hat" in the results
    And I should see "Shoes" in the results
    And I should see "Big Mac" in the results
    And I should see "Sheets" in the results

  Scenario: Search by category
    When I visit the "Home Page"
    And I press the "Clear" button
    And I select "Food" in the "Category" dropdown
    And I press the "Search" button
    Then I should see the message "Success"
    And I should see "Big Mac" in the results
    And I should not see "Hat" in the results
    And I should not see "Shoes" in the results
    And I should not see "Sheets" in the results

  Scenario: Search by available
    When I visit the "Home Page"
    And I press the "Clear" button
    And I select "True" in the "Available" dropdown
    And I press the "Search" button
    Then I should see the message "Success"
    And I should see "Hat" in the results
    And I should see "Big Mac" in the results
    And I should see "Sheets" in the results
    And I should not see "Shoes" in the results

  Scenario: Search by name
    When I visit the "Home Page"
    And I set the "Name" field to "Hat"
    And I press the "Search" button
    Then I should see the message "Success"
    And I should see "Hat" in the results
    And I should not see "Shoes" in the results
