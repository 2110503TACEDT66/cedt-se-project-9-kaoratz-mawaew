beforeEach(() => {
    // User login
    cy.visit("/login");
    cy.get('input[type="email"]').type(Cypress.env('managerEmail'));
    cy.get('input[type="password"]').type(Cypress.env('managerPassword'));
    cy.get('button[type="submit"]').click();

    // Navigate to create restaurant page
    cy.wait(1000);
    cy.visit('/restaurant/create');
    cy.wait(1000);
    cy.url().should('include', '/restaurant/create');
});

describe('Restaurant Page - Map Display', () => {
    it('should display the map when the Map API has data for the restaurant', () => {
        cy.visit('/restaurant/6621d427ae869b4e300eb00e');
        cy.get('iframe#map').should('exist');
    });

    it('should not display the map when the Map API does not have data for the restaurant', () => {
        cy.visit('/restaurant/662de8d1c254caec758ef760');
        cy.get('iframe#map').should('not.exist');
    });
});
