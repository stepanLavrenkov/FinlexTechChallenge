Feature: Currency

    @LoggedInAsAdmin
    Scenario: Create a currency
        Given user is on currencies page
        When new random currency is created
        Then the currency should exist in the table

    @LoggedInAsAdmin
    Scenario: Update a currency
        Given user is on currencies page
        Given a new currency "Test" with code "TS" and rate "50" is created
        When the currency "Test" is updated with new name "Peso", code "Mex$" and rate "100"
        Then the currency data should be updated in the table

    @LoggedInAsAdmin
    Scenario: Delete currencies
        Given user is on currencies page and new currencies are created
            | Name   | Code | Rate |
            | Pound  | GBP  | 50   |
            | Koruna | Kč   | 100  |
        When folowing currencies are deleted
            | Code |
            | GBP  |
            | Kč   |
        Then deleted currencies should be removed from the table
