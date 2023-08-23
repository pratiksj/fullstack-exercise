describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3002/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('input:first').type('root')
      cy.get('input:last').type('123')
      cy.contains('submit').click()


    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('input:first').type('root')
      cy.get('input:last').type('abc')
      cy.contains('submit').click()
      cy.contains('invalid username or password')
    })
  })
})