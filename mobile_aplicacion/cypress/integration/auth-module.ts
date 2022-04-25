describe('Auth Module', () => {

  beforeEach(() => {
    cy.intercept('/auth/login').as('login');

    cy.visit('/login');
    cy.get('input[formControlName=email]').type('user@email.com');
    cy.get('input[formControlName=password]').type('password');
    cy.get('ion-button[type=submit]').click();

    cy.wait('@login').then((interception) => {
      expect(interception.response.statusCode).eql(200);
      cy.url().should('include', '/main-menu').end();
    });
  });

  it('Update User', () => {
    cy.intercept('/users/*').as('update');
    cy.visit('/update-user');

    cy.get('input[formControlName=name]').type('Auto Testing');
    cy.get('input[formControlName=email]').type('user@email.com');
    cy.get('input[formControlName=password]').type('password');
    cy.get('ion-button[type=submit]').click();

    cy.wait('@update').then((interception) => {
      expect(interception.response.statusCode).eql(200);
      cy.url().should('include', '/main-menu').end();
    });
  });

});
