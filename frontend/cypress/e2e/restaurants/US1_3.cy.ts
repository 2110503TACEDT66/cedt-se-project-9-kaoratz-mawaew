describe('Review Section', () => {
    it('should display an alert if user is not logged in', () => {
        cy.visit('/restaurant/662a06d40bd437f0efda6efd');   
        cy.get('span#rating').children().eq(6).click();
        cy.get('input#reviewInput').type('Great restaurant!');
        cy.get('button#sendReview').click();
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Please log in to post review');
        });
    });

    it('should display an alert if rating or comment is missing', () => {
        cy.visit("/login");
        cy.get('input[type="email"]').type(Cypress.env('userEmail'));
        cy.get('input[type="password"]').type(Cypress.env('userPassword'));
        cy.get('button[type="submit"]').click();

        // Navigate to create dashboard page
        cy.wait(1000);
        cy.url().should('include', '/dashboard');
        cy.get('#662f2f603ea198b363379af5').click();
        cy.url().should('include', '/restaurant/662a06d40bd437f0efda6efd');

        cy.get('button#sendReview').click();
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Please fill in all fields');
        });
    });

    it('comment success', () => {
        cy.visit("/login");
        cy.get('input[type="email"]').type(Cypress.env('userEmail'));
        cy.get('input[type="password"]').type(Cypress.env('userPassword'));
        cy.get('button[type="submit"]').click();

        // Navigate to create dashboard page
        cy.wait(1000);
        cy.url().should('include', '/dashboard');
        cy.get('#662f2f603ea198b363379af5').click();
        cy.wait(1000);
        cy.url().should('include', '/restaurant/662a06d40bd437f0efda6efd');
        
        cy.get('span#rating').children().eq(6).click();
        cy.get('input#reviewInput').type('Great restaurant!');
        cy.get('button#sendReview').click();
    });
});
