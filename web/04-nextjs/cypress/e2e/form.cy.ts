describe('form page', () => {
  it('contains About page', () => {
    cy.visit('/')
    cy.contains('About')
  })
  it('submit without values', () => {
    cy.visit('/about')
    cy.get('form').submit()
    cy.get('p').should('not.exist')
  })

  it('submit with values', () => {
    cy.visit('/about')
    cy.get('label').contains('Name').type('Abraham')
    cy.get('label').contains('Subject').type('feedback')
    cy.get('label')
      .contains('Comments')
      .type('This is the place where I can share my feedback')
    cy.get('form').submit()
    cy.get('p').should('have.text', 'Form submitted')
  })

  it('submit with values - API error', () => {
    // intercept request to create a test behavior
    cy.intercept('/api/feedback', (request) => {
      request.reply({
        statusCode: 500,
      })
    })
    cy.visit('/about')
    cy.get('label').contains('Name').type('Abraham')
    cy.get('label').contains('Subject').type('feedback')
    cy.get('label')
      .contains('Comments')
      .type('This is the place where I can share my feedback')
    cy.get('form').submit()
    cy.get('p').should('have.text', 'Something went wrong')
  })
})
