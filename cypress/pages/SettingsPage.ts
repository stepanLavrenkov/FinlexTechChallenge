import { CurrencyData } from 'cypress/types/currencyTypes';
import faker from 'faker';

export default class SettingsPage {
  findCurrencyByData(currencyName: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains(currencyName);
  }

  setCurrencyDataAndSave(data: CurrencyData): CurrencyData {
    cy.get(selectors.currencyNameInput).type(data.name);
    cy.get(selectors.currencyCodeInput).type(data.code);
    cy.get(selectors.currencyCodeInput).type(data.rate.toString());
    cy.get(selectors.currencySaveReturnButton).click();

    return data;
  }

  createCurrency(
    name = faker.random.word(),
    code = faker.random.alpha({ count: 3 }).toUpperCase(),
    rate = faker.datatype.number(100).toString()
  ): CurrencyData {
    cy.get(selectors.addCurrencyButton).click({ force: true });

    return this.setCurrencyDataAndSave({ name, rate, code });
  }

  deleteCurrency(currencyName: string) {
    this.findCurrencyByData(currencyName).parent().find(selectors.deleteCurrencyButton).click();
  }

  updateCurrency(oldName: string, name: string, code: string, rate: string): CurrencyData {
    this.findCurrencyByData(oldName).parent().find(selectors.updateCurrencyButton).click();

    return this.setCurrencyDataAndSave({ name, code, rate });
  }

  visit() {
    cy.visit('settings/currencies/');
  }
}

const selectors = {
  addCurrencyButton: '[data-task="create"]',
  currencyNameInput: '[name="cHRfY3VycmVuY2llcy5uYW1l"]',
  currencyCodeInput: '[name="cHRfY3VycmVuY2llcy5jb2Rl"]',
  currencyRateInput: '[name="cHRfY3VycmVuY2llcy5yYXRl"]',
  currencySaveReturnButton: '[data-task="save"][data-after="list"]',
  deleteCurrencyButton: '[data-task="remove"]',
  updateCurrencyButton: '[data-task="edit"]'
};
