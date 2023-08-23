describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'laxmi',
      username: 'laxmi',
      password: '123'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
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
  it('login fails with wrong password', function () {
    cy.contains('login').click()
    cy.get('input:first').type('laxmi')
    cy.get('input:last').type('wrong')
    cy.contains('submit').click()

    cy.contains('Wrong credentials')
    cy.get('html').should('not.contain', 'laxmilogged in')
  })
  describe('when logged in', () => {
    beforeEach(function () {

      cy.contains('login').click()
      cy.login({ username: 'laxmi', password: '123' })
    })

    it('a new note can be created', function () {


      cy.contains('create new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', () => {
      beforeEach(function () {

        cy.createNote({
          content: 'another note cypress',
          important: true
        })
      })

      it('it can be made important', function () {


        cy.contains('another note cypress')
        cy.contains('make not important')
      })

    })

    describe('and several notes exist', () => {
      beforeEach(function () {

        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').click()
        cy.contains('second note').parent().find('button')
          .should('contain', 'make not important')


        // cy.contains('second note').contains('make important').click()

        // cy.contains('second note')
        //   .contains('make not important')

      })

    })

  })



})

