describe('Activity Module', () => {

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

  it('List activities', () => {
    const filter = '';
    let count = 0;
    cy.intercept({
      pathname: '/activities',
      query: {
        page: '0',
        size: '5',
        filter
      },
    }).as('list');

    cy.visit('/activities');

    cy.wait('@list').then((interception) => {
      expect(interception.response.statusCode).eql(200);
      count = interception.response.body.metadata.count;
    }).get('ion-col').should('have.length', count);
  });

  it('see activity', () => {
    const filter = '';
    cy.intercept({
      pathname: '/activities',
      query: {
        page: '0',
        size: '5',
        filter
      },
    }).as('list');
    cy.intercept('/activities/*').as('find');
    cy.visit('/activities');

    cy.wait('@list').then((list) => {
      expect(list.response.statusCode).eql(200);
    });

    cy.wait(1400);
    cy.get('ion-col').first().click();

    cy.url().should('include','/activity-detail');

  });

  it('Create Comment', () => {
    cy.intercept('/activities/*').as('create');
    cy.visit('/activities');

    cy.wait(1400);
    cy.get('ion-col').first().click();
    cy.get('ion-textarea').type('Prueba Comentario Automatica').type('{enter}');

    cy.wait('@create').then((interception) => {
      expect(interception.response.statusCode).eql(200);
    });

  });


});
