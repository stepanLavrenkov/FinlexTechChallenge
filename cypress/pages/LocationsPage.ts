export class LocationPage {
  static visit() {
    cy.visit('/locations');
  }

  static sortByStatus(sort: 'asc' | 'desc') {
    cy.get(selectors.statusColumnButton).click({ force: true }).wait(500);
    cy.get(selectors.statusColumnButton)
      .invoke('attr', 'data-order')
      .then((value) => {
        if (value !== sort) {
          cy.get(selectors.statusColumnButton).click({ force: true }).wait(1000);
        }
      });
  }

  static setStatusFirstLocation(status: 'Enabled' | 'Disabled') {
    cy.get(selectors.rowNumberSelector).contains(1).parent().find(selectors.editLocationButton).click({ force: true });
    cy.get(selectors.statusFields).select(status);
    cy.get(selectors.saveLocationButton).click();
  }
}

const selectors = {
  statusColumnButton: '[data-orderby="pt_locations.status"]',
  rowNumberSelector: '.xcrud-current',
  editLocationButton: '[title="Edit"]',
  statusFields: '[name="status"]',
  saveLocationButton: '[type="submit"]'
};
