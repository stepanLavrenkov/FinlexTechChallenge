import { When, Then, Given, DataTable, Before } from '@badeball/cypress-cucumber-preprocessor';
import { LoginPage, LocationPage } from '@pages';

class Location {
  private static locationName: string;

  static setLocationName(name: string) {
    this.locationName = name;
  }

  static getLocationName() {
    return this.locationName;
  }
}

Before({ tags: '@LoggedInAsAdmin' }, () => {
  LoginPage.loginAsAdmin();
});

Given('user is on locations page', () => {
  LocationPage.visit();
});

Given('locations are sorted in {string} order by status field', (order: 'asc' | 'desc') => {
  LocationPage.sortByStatus(order);
});

Then('status of a first location is set to {string}', (status: 'Enabled' | 'Disabled') => {
  LocationPage.setStatusFirstLocation(status);
});
