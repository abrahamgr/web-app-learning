describe('home page', () => {
  it('have links on page', () => {
    cy.visit('/')
    cy.contains('Characters')
  })
  it('have links on page', () => {
    cy.visit('/')
    cy.contains('Characters').click()
    cy.get('button').contains('Prev').should('be.disabled')
    cy.get('button').contains('Next').should('be.enabled')
  })
})
