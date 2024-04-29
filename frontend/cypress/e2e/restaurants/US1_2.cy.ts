beforeEach(() => {
    // User login
    cy.visit("/login");
    cy.get('input[type="email"]').type(Cypress.env('managerEmail'));
    cy.wait(500);
    cy.get('input[type="password"]').type(Cypress.env('managerPassword'));
    cy.wait(500);
    cy.get('button[type="submit"]').click();

    cy.wait(500);
    cy.visit('/restaurant/create');
    cy.wait(500);
    cy.url().should('include', '/restaurant/create');
});

describe('publish resrtaurant', () => {
    it('Successfully creates a restaurant', () => {
        cy.visit('/create-restaurant'); // Assuming '/create-restaurant' is the URL for the create restaurant page
      
        // Fill in form fields
        cy.get('#name').type('Sample Restaurant');
        cy.get('#opentime').type('10:00 AM');
        cy.get('#closetime').type('8:00 PM');
        // Fill in other required fields...
      
        // Upload an image
        cy.get('#image-upload-input').attachFile('sample-image.jpg');
      
        // Select tags
        cy.get('.MuiChip-label').contains('Thai').click();
        cy.get('.MuiChip-label').contains('Japanese').click();
        // Add other tags as needed...
      
        // Submit the form
        cy.get('#publish').click();
      
        // Verify that the restaurant is created successfully
        cy.url().should('include', '/restaurants/sample-restaurant'); // Assuming the URL changes after successful creation
      });
      
      it('Displays error messages for incomplete form submission', () => {
        cy.visit('/create-restaurant');
      
        // Leave a required field empty
        cy.get('#opentime').type('10:00 AM'); // Only fill one of the required fields
      
        // Submit the form
        cy.get('#publish').click();
      
        // Verify that error messages are displayed for the missing fields
        cy.contains('This field is required').should('exist');
      });

      it('Adds tags to the restaurant', () => {
        cy.visit('/create-restaurant');
      
        // Select tags
        cy.get('.MuiChip-label').contains('Chinese').click();
        cy.get('.MuiChip-label').contains('Italian').click();
        // Add other tags as needed...
      
        // Verify that the selected tags are added
        cy.get('.selected-tags').should('contain', 'Chinese');
        cy.get('.selected-tags').should('contain', 'Italian');
      });

      it('Uploads an image for the restaurant', () => {
        cy.visit('/create-restaurant');
      
        // Upload an image
        cy.get('#image-upload-input').attachFile('sample-image.jpg');
      
        // Verify that the uploaded image is displayed
        cy.get('#uploaded-image').should('be.visible');
      });

      it('Selects a map location for the restaurant', () => {
        cy.visit('/create-restaurant');
      
        // Select a location on the map (assuming MapSection has specific identifiers or classes)
        cy.get('.map-container').click(200, 200); // Click at specific coordinates on the map
      
        // Verify that the selected location is displayed
        cy.get('#selected-location').should('contain', 'Latitude:');
        cy.get('#selected-location').should('contain', 'Longitude:');
      });

      it('Navigates back without data loss', () => {
        cy.visit('/create-restaurant');
      
        // Fill in some form fields
        cy.get('#name').type('Sample Restaurant');
        cy.get('#opentime').type('10:00 AM');
        // Fill in other fields as needed...
      
        // Click on the back button
        cy.get('.back-button').click();
      
        // Verify that the user is navigated back to the previous page
        cy.url().should('include', '/dashboard'); // Assuming the back button goes to the dashboard
      });      
});