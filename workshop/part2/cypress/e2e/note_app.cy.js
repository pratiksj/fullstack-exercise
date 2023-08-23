describe('Note app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {

    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })
  it('login form can be opened', function () {
    cy.contains('login').click()
    cy.get('input:first').type('laxmi')
    cy.get('input:last').type('123')
    cy.contains('submit').click()
    cy.contains('laxmilogged in')
  })

})