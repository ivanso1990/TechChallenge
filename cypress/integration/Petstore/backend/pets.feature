Feature: Pets

  • Get available pets. Assert expected result
  • Post a new available pet to the store. Assert new pet added.
  • Update this pet status to sold. Assert status updated.
  • Delete this pet. Assert deletion.

  Background: Checking the api is up to ready
    Given the api is running


  Scenario: Get available pets
    When the user checks all pets with 'available' status
    Then  there are at least '1' pets


  Scenario: Add a new pet
    When the user adds a new pet like:
      | name          | value     |
      | id            | 300390    |
      | category.id   | 99        |
      | category.name | test      |
      | name          | newPet    |
      | photoUrls     |           |
      | status        | available |
    Then the pet 'newPet' has been successfully added


  Scenario: Update a pet
    Given the 'newPet' pet exists
    When the 'newPet' pet is sold out
    Then the 'newPet' pet status is 'sold'


  Scenario: Delete a pet
    Given the following pet exists:
      | name   | value     |
      | name   | newPet    |
      | status | available |
    When the user removes the 'newPet' pet
    Then the 'newPet' pet does not exist


  Scenario: Full path
    When the user checks all pets with 'available' status
    And the user adds a new pet like:
      | name          | value     |
      | id            | 300390    |
      | category.id   | 99        |
      | category.name | test      |
      | name          | newPet    |
      | photoUrls     |           |
      | status        | available |
    Then the pet 'newPet' has been successfully added

    When the 'newPet' pet is sold out
    Then the 'newPet' pet status is 'sold'

    When the user removes the 'newPet' pet
    Then the 'newPet' pet does not exist
