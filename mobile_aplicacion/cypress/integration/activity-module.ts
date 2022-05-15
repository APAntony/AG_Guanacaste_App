describe('Activity Module', () => {

  beforeEach(() => {
    cy.intercept('/auth/login').as('login');

    cy.visit('/login');
    cy.get('ion-input[formControlName=email]').type('user@email.com');
    cy.get('ion-input[formControlName=password]').type('password');
    cy.get('ion-button[type=submit]').click();

    cy.wait('@login').then((interception) => {
      expect(interception.response.statusCode).eql(200);
      cy.url().should('include', '/dashboard').end();
    });
  });

  it('List activities', async () => {
    cy.intercept('GET', '/activities*').as('list');

    cy.get('#activities').click();
    cy.url().should('include','/activities');

    cy.wait('@list').its('response.statusCode').should('eq', 200).its('response.body.metadata.count').should('gte',0);
  });

  it('Apply filter', () => {
    cy.intercept('GET', '/activities*').as('list');

    cy.get('#activities').click();
    cy.url().should('include','/activities');


    cy.wait('@list').then((interception) => {
      cy.get('#filter-button').click();
      cy.get('#filter').find('ion-item').first().click();
      cy.get('#filter').click();
      cy.wait('@list');
    });
  });

  it('See activity', () => {
    cy.intercept('GET', '/activities*').as('list');
    cy.intercept('/activities/*').as('find');
    
    cy.get('#activities').click();
    cy.url().should('include','/activities');

    cy.wait('@list');

    cy.get('div.item').first().click();

    cy.url().should('include','/activity-detail');

  });

  it('Create Comment', () => {
    cy.intercept('GET', '/activities*').as('list');
    cy.intercept('/activities/*').as('create');
    
    cy.get('#activities').click();
    cy.url().should('include','/activities');

    cy.wait('@list');

    cy.get('div.item').first().click();
    cy.get('ion-textarea').type('Prueba Comentario Automatica').type('{enter}');

    cy.wait('@create');

  });


});
