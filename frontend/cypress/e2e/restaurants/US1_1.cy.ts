beforeEach(() => {
  // User login
  cy.visit("/login");
  cy.get('input[type="email"]').type(Cypress.env('userEmail'));
  cy.wait(500);
  cy.get('input[type="password"]').type(Cypress.env('userPassword'));
  cy.wait(500);
  cy.get('button[type="submit"]').click();
  cy.wait(500);
  cy.visit('/restaurant');

  cy.wait(500);
  cy.get('button#sidebar').as('filter');
});

describe('filter test', () => {
  it('check single tag click', () => {
    // Thai
    cy.get('@filter').children().first().click();
    cy.url().should('include', 'tags=Thai');

    cy.get('@filter').children().first().click();
    cy.url().should('not.include', 'tags=Thai');

    // Japanese
    cy.get('@filter').children().eq(1).click();
    cy.url().should('include', 'tags=Japanese');

    cy.get('@filter').children().eq(1).click();
    cy.url().should('not.include', 'tags=Japanese');

    // Chinese
    cy.get('@filter').children().eq(2).click();
    cy.url().should('include', 'tags=Chinese');

    cy.get('@filter').children().eq(2).click();
    cy.url().should('not.include', 'tags=Chinese');

    // Italian
    cy.get('@filter').children().eq(3).click();
    cy.url().should('include', 'tags=Italian');

    cy.get('@filter').children().eq(3).click();
    cy.url().should('not.include', 'tags=Italian');

    // American
    cy.get('@filter').children().eq(4).click();
    cy.url().should('include', 'tags=American');

    cy.get('@filter').children().eq(4).click();
    cy.url().should('not.include', 'tags=American');

    // Mexican
    cy.get('@filter').children().eq(5).click();
    cy.url().should('include', 'tags=Mexican');

    cy.get('@filter').children().eq(5).click();
    cy.url().should('not.include', 'tags=Mexican');

    // Indian
    cy.get('@filter').children().eq(6).click();
    cy.url().should('include', 'tags=Indian');

    cy.get('@filter').children().eq(6).click();
    cy.url().should('not.include', 'tags=Indian');

    // Korean
    cy.get('@filter').children().eq(7).click();
    cy.url().should('include', 'tags=Korean');

    cy.get('@filter').children().eq(7).click();
    cy.url().should('not.include', 'tags=Korean');

    // Vietnamese
    cy.get('@filter').children().eq(8).click();
    cy.url().should('include', 'tags=Vietnamese');

    cy.get('@filter').children().eq(8).click();
    cy.url().should('not.include', 'tags=Vietnamese');

    // French
    cy.get('@filter').children().eq(9).click();
    cy.url().should('include', 'tags=French');

    cy.get('@filter').children().eq(9).click();
    cy.url().should('not.include', 'tags=French');
  });

  it('check multiple tag click', () => {
    // Thai, Chinese, Korean
    cy.get('@filter').children().first().click();
    cy.wait(500);
    cy.get('@filter').children().eq(2).click();
    cy.wait(500);
    cy.get('@filter').children().eq(7).click();
    cy.wait(500);
    cy.url().should('include', 'tags=Thai%2CChinese%2CKorean');

    cy.get('@filter').children().first().click();
    cy.wait(500);
    cy.get('@filter').children().eq(2).click();
    cy.wait(500);
    cy.get('@filter').children().eq(7).click();
    cy.wait(500);
    cy.url().should('not.include', 'tags=Thai%2CChinese%2CKorean');
  });

  it('check on tag with no restaurant', () => {
    // Vietnamese
    cy.get('@filter').children().eq(8).click();
    cy.url().should('include', 'tags=Vietnamese');
    cy.contains('Not Found');

    cy.get('@filter').children().eq(9).click();
    cy.url().should('not.include', 'tags=French');
  });
  
  it('check all tag click', () => {
    // Thai, Japanese, Chinese, Italian, American, Mexican, Indian, Korean, Vietnamese, French
    cy.get('@filter').children().first().click();
    cy.wait(500);
    cy.get('@filter').children().eq(1).click();
    cy.wait(500);
    cy.get('@filter').children().eq(2).click();
    cy.wait(500);
    cy.get('@filter').children().eq(3).click();
    cy.wait(500);
    cy.get('@filter').children().eq(4).click();
    cy.wait(500);
    cy.get('@filter').children().eq(5).click();
    cy.wait(500);
    cy.get('@filter').children().eq(6).click();
    cy.wait(500);
    cy.get('@filter').children().eq(7).click();
    cy.wait(500);
    cy.get('@filter').children().eq(8).click();
    cy.wait(500);
    cy.get('@filter').children().eq(9).click();
    cy.wait(500);
    cy.url().should('include', 'tags=Thai%2CJapanese%2CChinese%2CItalian%2CAmerican%2CMexican%2CIndian%2CKorean%2CVietnamese%2CFrench');

    cy.get('@filter').children().first().click();
    cy.wait(500);
    cy.get('@filter').children().eq(1).click();
    cy.wait(500);
    cy.get('@filter').children().eq(2).click();
    cy.wait(500);
    cy.get('@filter').children().eq(3).click();
    cy.wait(500);
    cy.get('@filter').children().eq(4).click();
    cy.wait(500);
    cy.get('@filter').children().eq(5).click();
    cy.wait(500);
    cy.get('@filter').children().eq(6).click();
    cy.wait(500);
    cy.get('@filter').children().eq(7).click();
    cy.wait(500);
    cy.get('@filter').children().eq(8).click();
    cy.wait(500);
    cy.get('@filter').children().eq(9).click();
    cy.wait(500);
    cy.url().should('not.include', 'tags=Thai%2CJapanese%2CChinese%2CItalian%2CAmerican%2CMexican%2CIndian%2CKorean%2CVietnamese%2CFrench');
  });
})