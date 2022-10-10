import { When, Then, Given, DataTable, Before } from '@badeball/cypress-cucumber-preprocessor';
import pages from '@pages';
import { CurrencyData } from 'cypress/types/currencyTypes';

class Currency {
  private static currencyData: CurrencyData;
  static deletedCurrencyNames: string[] = [];

  static setCurrencyData(currencyData: CurrencyData) {
    this.currencyData = currencyData;
  }

  static getCurrencyData() {
    return this.currencyData;
  }
}

Before({ tags: '@LoggedInAsAdmin' }, () => {
  pages.loginPage.loginAsAdmin();
});

Given('user is on currencies page', () => {
  pages.settingsPage.visit();
});

Given(
  'a new currency {string} with code {string} and rate {string} is created',
  (name: string, code: string, rate: string) => {
    Currency.setCurrencyData(pages.settingsPage.createCurrency(name, code, rate));
  }
);

Given(/^user is on currencies page and new currencies are created$/, (currenciesData: DataTable) => {
  pages.settingsPage.visit();
  const currencies = currenciesData.rows();

  currencies.forEach((currency) => {
    pages.settingsPage.createCurrency(currency[0], currency[1], currency[2]);
  });
});

When(
  'the currency {string} is updated with new name {string}, code {string} and rate {string}',
  (name: string, newName: string, newCode: string, newRate: string) => {
    Currency.setCurrencyData(pages.settingsPage.updateCurrency(name, newName, newCode, newRate));
  }
);

When('new random currency is created', () => {
  Currency.setCurrencyData(pages.settingsPage.createCurrency());
});

When(/^folowing currencies are deleted$/, (currencies: DataTable) => {
  const currencyNames = currencies.rows();

  currencyNames.forEach((currencyName) => {
    Currency.deletedCurrencyNames.push(currencyName[0]);

    pages.settingsPage.deleteCurrency(currencyName[0]);
    cy.reload();
  });
});

Then('deleted currencies should be removed from the table', () => {
  Currency.deletedCurrencyNames.forEach((currencyName) => {
    pages.settingsPage.findCurrencyByData(currencyName).should('not.exist');
  });
});

Then('the currency should exist in the table', () => {
  const currencyName = Currency.getCurrencyData().name;
  pages.settingsPage.findCurrencyByData(currencyName).should('exist');

  pages.settingsPage.deleteCurrency(currencyName);
});

Then('the currency data should be updated in the table', () => {
  const currencyData = Currency.getCurrencyData();

  pages.settingsPage.findCurrencyByData(currencyData.name).parent().contains(currencyData.code).should('exist');
  pages.settingsPage.findCurrencyByData(currencyData.name).parent().contains(currencyData.rate).should('exist');

  pages.settingsPage.deleteCurrency(currencyData.code);
});
