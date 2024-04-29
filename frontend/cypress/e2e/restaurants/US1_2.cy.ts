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
  
describe('FormSection Component', () => {
    it('Successfully creates a restaurant', () => {
        // Fill in form fields
        cy.get('#name').type('Sample Restaurant');
        cy.get('#opentime').type('10:00 AM');
        cy.get('#closetime').type('8:00 PM');
        cy.get('#address').type('123 Test St');
        cy.get('#subdistrict').type('Test Subdistrict');
        cy.get('#region').type('Test Region');
        cy.get('#district').type('Test District');
        cy.get('#province').type('Test Province');
        cy.get('#postalcode').type('12345');
        cy.get('#tel').type('123-456-7890');
      
        cy.get('data-ut-element="button"').children();
        console.log(cy.get('[data-testcy="uploadDropzone"]').children());

        // Select tags
        cy.get('.MuiChip-label').contains('Thai').click();
        cy.get('.MuiChip-label').contains('Japanese').click();
      
        // Submit the form
        cy.get('#publish').click();
        cy.contains('This field is required').should('not.exist');
        cy.wait(1000);
        cy.url().should('include', '/restaurant');
    });
  
    it('Displays error messages for incomplete form submission', () => {
        // Leave a required field empty
        cy.get('#opentime').type('10:00 AM'); // Only fill one of the required fields
      
        // Submit the form
        cy.get('#publish').click();
      
        // Verify that error messages are displayed for the missing fields
        cy.contains('This field is required').should('exist');
    });

    it('Navigates back without data loss', () => {
        // Fill in some form fields
        cy.get('#name').type('Sample Restaurant');
        cy.get('#opentime').type('10:00 AM');
      
        // Click on the back button
        cy.get('div#backButton').click();

        cy.wait(1000);
      
        // Verify that the user is navigated back to the previous page
        cy.url().should('include', '/dashboard'); // Assuming the back button goes to the dashboard
    });      
});
