describe('Touristic Area Module', () => {

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

  it('List Touristic Areas', () => {
    cy.intercept('GET', '/touristic-areas*').as('list');

    cy.get('#places').click();
    cy.url().should('include','/places');

    cy.wait('@list');

  });

  it('Apply filter', () => {
    cy.intercept('GET', '/touristic-areas*').as('list');

    cy.get('#places').click();
    cy.url().should('include','/places');


    cy.wait('@list').then((interception) => {
     
      cy.get('#filter-button').click();
      cy.get('#filter').find('ion-item').first().click();
      cy.get('#filter').click();
      cy.wait('@list');
    });
  });


  it('See Touristic Areas', () => {
    cy.intercept('GET', '/touristic-areas*').as('list');
    cy.intercept('/touristic-areas/*').as('find');
    
    cy.get('#places').click();
    cy.url().should('include','/places');

    cy.wait('@list');

    cy.get('div.item').first().click();

    cy.url().should('include','/place-detail');
  });

  it('Create Comment', () => {
    cy.intercept('GET', '/touristic-areas*').as('list');
    cy.intercept('/touristic-areas/*').as('create');
    
    cy.get('#places').click();
    cy.url().should('include','/places');

    cy.wait('@list');

    cy.get('div.item').first().click();
    cy.get('ion-textarea').type('Prueba Comentar').type('{enter}');

    cy.wait('@create');
  });

});
