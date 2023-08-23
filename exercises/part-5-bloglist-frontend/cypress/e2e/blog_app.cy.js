describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3002/api/testing/reset')
    const user = {
      name: 'root',
      username: 'root',
      password: '123'
    }
    cy.request('POST', 'http://localhost:3002/api/users', user)
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
  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('input:first').type('root')
      cy.get('input:last').type('123')
      cy.contains('submit').click()
    })

    it('A blog can be created', function () {
      cy.contains('create new Blog').click()
      cy.get('#title').type('new blog from the cypres')
      cy.get('#author').type('root')
      cy.get('#url').type('kathmandupost.com')
      cy.get('#create').click()
    })
  })
})