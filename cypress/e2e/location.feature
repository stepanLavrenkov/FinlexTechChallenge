Feature: Location tests

    @LoggedInAsAdmin
    Scenario: Sort Location
        Given user is on locations page
        Given locations are sorted in "desc" order by status field
        Then status of a first location is set to "Disabled"