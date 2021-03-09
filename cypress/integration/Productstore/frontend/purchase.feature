Feature: Products

  • Customer navigation through product categories: Phones, Laptops and Monitors
  • Navigate to Laptop → Sony vaio i5 and click on Add to cart. Accept pop up confirmation.
  • Navigate to Laptop → Dell i7 8gb and click on Add to cart. Accept pop up confirmation.
  • Navigate to Cart → Delete Dell i7 8gb from cart.
  • Click on Place order.
  • Fill in all web form fields.
  • Click on Purchase
  • Capture and log purchase Id and Amount.
  • Assert purchase amount equals expected.
  • Click on Ok
  @focus
  Scenario: Purchase
    Given the user visits 'demoblaze' page
    And he adds the following products to cart:
      | name         | category |
      | Sony vaio i5 | Laptop   |
      | Dell i7 8gb  | Laptop   |
    And he navigates to cart
    And he removes the following products from cart:
      | name        |
      | Dell i7 8gb |
    And he confirms the order like:
      | name    | value     |
      | Name    | User_Test |
      | Country | Japan     |
      | City    | Tokyo     |
      | Card    | 123456789 |
      | Month   | June      |
      | Year    | 2012      |
    Then order has been successfully processed
    And the amount is correctly calculated
    And the order is accepted
