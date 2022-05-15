describe('Education Program Module', () => {

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

  it('List Eduation Programs', () => {

    cy.intercept('GET', '/education-programs*').as('list');

    cy.get('#programs').click();
    cy.url().should('include','/programs');

    cy.wait('@list');
  });

  it('Apply filter', () => {
    cy.intercept('GET', '/education-programs*').as('list');

    cy.get('#programs').click();
    cy.url().should('include','/programs');


    cy.wait('@list').then((interception) => {
      cy.get('#filter-button').click();
      cy.get('#filter').find('ion-item').first().click();
      cy.get('#filter').click();
      cy.wait('@list');
    });
  });

  it('See Education Program', () => {
    cy.intercept('GET', '/education-programs*').as('list');
    cy.intercept('/education-programs/*').as('find');
    
    cy.get('#programs').click();
    cy.url().should('include','/programs');

    cy.wait('@list');

    cy.get('div.item').first().click();

    cy.url().should('include','/program-detail');
  });

  it('Create Comment', () => {
    cy.intercept('GET', '/education-programs*').as('list');
    cy.intercept('/education-programs/*').as('create');
    
    cy.get('#programs').click();
    cy.url().should('include','/programs');

    cy.wait('@list');

    cy.get('div.item').first().click();
    cy.get('ion-textarea').type('Prueba Comentario').type('{enter}');

    cy.wait('@create');

  });

});
