describe('Bookmark Page Loads', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/bookmark')
    cy.get('[data-testid="title"]').should('exist')
  })
})