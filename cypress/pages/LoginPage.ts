export default class LoginPage {
  login(email: string, password: string) {
    cy.get(selectors.emailInput).filter(':visible').type(email, { force: true });
    cy.get(selectors.passwordInput).filter(':visible').type(password, { force: true });
    cy.get(selectors.submitButton).click();
  }

  loginAsAdmin() {
    const email = Cypress.env('ADMIN_EMAIL');
    const password = Cypress.env('ADMIN_PASSWORD');
    cy.session([email, password], () => {
      this.visit();
      this.login(email, password);
    });
    // this.visit();
    // this.login(email, password);
  }

  visit() {
    cy.visit('/');
  }
}

const selectors = {
  emailInput: '[name="email"]',
  passwordInput: '[name="password"]',
  submitButton: '[type="submit"]'
};
