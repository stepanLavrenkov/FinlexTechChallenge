import { When, Then, Given, DataTable, Before, After } from '@badeball/cypress-cucumber-preprocessor';
import { LoginPage, CurrencyPage } from '@pages';
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
  LoginPage.loginAsAdmin();
});

After({ tags: '@DeleteCurrencies' }, () => {
  CurrencyPage.visit();
  CurrencyPage.deleteCurrency(Currency.getCurrencyData().name);
});

Given('user is on currencies page', () => {
  CurrencyPage.visit();
});

Given(
  'a new currency {string} with code {string} and rate {string} is created',
  (name: string, code: string, rate: string) => {
    Currency.setCurrencyData(CurrencyPage.createCurrency(name, code, rate));
  }
);

Given(/^user is on currencies page and new currencies are created$/, (currenciesData: DataTable) => {
  CurrencyPage.visit();
  const currencies = currenciesData.rows();

  currencies.forEach((currency) => {
    CurrencyPage.createCurrency(currency[0], currency[1], currency[2]);
  });
});

When('a user create a currency with the same code', () => {
  const { name, rate, code } = Currency.getCurrencyData();

  CurrencyPage.createCurrency(name, code, rate);
});

When(
  'the currency {string} is updated with new name {string}, code {string} and rate {string}',
  (name: string, newName: string, newCode: string, newRate: string) => {
    Currency.setCurrencyData(CurrencyPage.updateCurrency(name, newName, newCode, newRate));
  }
);

When('new random currency is created', () => {
  Currency.setCurrencyData(CurrencyPage.createCurrency());
});

When(/^folowing currencies are deleted$/, (currencies: DataTable) => {
  const currencyNames = currencies.rows();

  currencyNames.forEach((currencyName) => {
    Currency.deletedCurrencyNames.push(currencyName[0]);

    CurrencyPage.deleteCurrency(currencyName[0]);
    cy.reload();
  });
});

Then('deleted currencies should be removed from the table', () => {
  Currency.deletedCurrencyNames.forEach((currencyName) => {
    CurrencyPage.findCurrencyByData(currencyName).should('not.exist');
  });
});

Then('the currency should exist in the table', () => {
  const currencyName = Currency.getCurrencyData().name;
  CurrencyPage.findCurrencyByData(currencyName).should('exist');
});

Then('the currency data should be updated in the table', () => {
  const currencyData = Currency.getCurrencyData();

  CurrencyPage.findCurrencyByData(currencyData.name).parent().contains(currencyData.code).should('exist');
  CurrencyPage.findCurrencyByData(currencyData.name).parent().contains(currencyData.rate).should('exist');
});

Then('the error should be thrown', () => {
  CurrencyPage.saveCurrencyErorShouldBeVisible();
});
