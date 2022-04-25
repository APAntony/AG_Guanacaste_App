describe('Auth Module', () => {
  it('login', () => {
    cy.intercept('/auth/login').as('login');

    cy.visit('/login');
    cy.get('input[formControlName=email]').type('admin@email.com');
    cy.get('input[formControlName=password]').type('admin@email.com');
    cy.get('ion-button[type=submit]').click();

    cy.wait('@login').then((interception) => {
      expect(interception.response.statusCode).eql(200);
    });
  });
});
