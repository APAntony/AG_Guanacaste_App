describe('Touristic Area Module', () => {

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

  it('List Touristic Areas', () => {
    const filter = '';
    let count = 0;
    cy.intercept({
      pathname: '/touristic-areas',
      query: {
        page: '0',
        size: '25',
        filter
      },
    }).as('list');

    cy.visit('/places');

    cy.wait('@list').then((interception) => {
      expect(interception.response.statusCode).eql(200);
      count = interception.response.body.metadata.count;
      console.log(count);
      cy.get('ion-list').get('ion-item').should('have.length', count);
    });
  });

  it('see Touristic Areas', () => {
    const filter = '';
    cy.intercept({
      pathname: '/touristic-areas',
      query: {
        page: '0',
        size: '25',
        filter
      },
    }).as('list');
    cy.intercept('/touristic-areas/*').as('find');
    cy.visit('/places');

    cy.wait('@list').then((list) => {
      expect(list.response.statusCode).eql(200);
      cy.get('ion-list').get('ion-item').first().find('ion-label').click();

      cy.wait('@find').then((find) => {
        const body = find.response.body;
        expect(find.response.statusCode).eql(200);

        cy.get('h2').contains(body.data.name);
        cy.get('div[id=description]').then(element=>{
          expect(element.text()).length.to.be.greaterThan(0);
        });
      });
    });
  });

  it('Create Comment', () => {
    cy.intercept('/touristic-areas/*').as('create');
    cy.visit('/places');

    cy.get('ion-list').get('ion-item').first().find('ion-label').click();
    cy.get('ion-textarea').type('Prueba Comentario Automatica').type('{enter}');

    cy.wait('@create').then((interception) => {
      expect(interception.response.statusCode).eql(200);
    });

  });

});
