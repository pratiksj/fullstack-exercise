describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'root',
      username: 'root',
      password: '123'
    }
    const secondUser = {
      name: 'laxmi',
      username: 'laxmi',
      password: '123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, secondUser)

    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.login({
        username: 'root',
        password: '123'
      })
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
    describe('likes', function () {
      beforeEach(function () {
        cy.contains('create new Blog').click()
        cy.createBlog({
          title: 'yeta aau',
          author: 'root',
          url: 'setopati.com'
        })
      })
      it('A blog can be like', function () {
        cy.contains('view').click()
        cy.contains('likes').click()
        cy.contains('1')
      })
      it('A blog can be delete', function () {
        cy.contains('view').click()
        cy.contains('Delete').click()
        cy.contains('yeta aau').should('not.exist')
      })
    })
  })
  describe('final test', () => {
    it('logged in user can see the delete button but can not see someone else blog', function () {
      cy.contains('login').click()
      // eslint-disable-next-line object-curly-spacing
      cy.login({ username: 'root', password: '123' })
      cy.contains('create new Blog').click()
      cy.createBlog({
        title: 'democracy',
        author: 'root',
        url: 'setopati.com'
      })
      cy.contains('view').click()
      cy.contains('Delete')
      cy.contains('Hide').click()
      cy.contains('logOut').click()
      cy.contains('login').click()
      cy.login({ username: 'laxmi', password: '123' })
      cy.contains('view').click()
      cy.contains('Delete').should('not.exist')
    })

    it.only('based  on likes, blogs can be order', function () {
      cy.contains('login').click()
      cy.login({ username: 'root', password: '123' })
      cy.contains('create new Blog').click()
      cy.createBlog({
        title: 'democracy',
        author: 'root',
        url: 'setopati.com'
      })
      cy.contains('democracy')
      cy.contains('view').click()
      cy.contains('likes').click()
      cy.wait(500)
      cy.contains('likes').click()
      cy.wait(500)
      cy.contains('Hide').click()
      cy.contains('create new Blog').click()
      cy.createBlog({
        title: 'loktantra',
        author: 'root',
        url: 'setopati.com'
      })
      cy.contains('loktantra').parent().find('button').click()

      cy.contains('likes').click()
      cy.wait(500)
      cy.contains('likes').click()
      cy.wait(500)
      cy.contains('likes').click()
      cy.wait(500)
      cy.contains('likes').click()
      cy.wait(500)
      cy.contains('Hide').click()

      cy.contains('create new Blog').click()
      cy.createBlog({
        title: 'rajtantra',
        author: 'root',
        url: 'setopati.com'
      })
      cy.contains('rajtantra').parent().find('button').click()

      cy.contains('likes').click()
      cy.wait(500)
      cy.contains('likes').click()
      cy.wait(500)
      cy.contains('likes').click()
      cy.wait(500)
      cy.contains('Hide').click()
      cy.get('.blog').eq(0).should('contain', 'loktantra')
      cy.get('.blog').eq(1).should('contain', 'rajtantra')
      cy.get('.blog').eq(2).should('contain', 'democracy')
    })

  })
})