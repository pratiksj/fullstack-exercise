/* eslint-disable indent */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import BlogDetails from './BlogDetails'

describe('first test of exercise ', () => {
    test('renders blog', () => {
        const blog = {
            title: 'javascript is hard',
            author: 'usha',
            url: 'kathmandupost.com',
            likes: 11
        }

        const { container } = render(<Blog blog={blog} />)
        const showBlog = container.querySelector('.blog')


        expect(showBlog).toHaveTextContent('javascript is hard')
        expect(showBlog).toHaveTextContent('usha')
    })
})


describe('second  test', () => {
    let blog
    let User
    beforeEach(() => {
        blog = {
            title: 'javascript is hard',
            author: 'usha',
            url: 'kathmandupost.com',
            likes: 11,
            user: {
                username: 'laxmi',
                name: 'laxmi',
                id: '1234566',
            },
        }
        User = {
            username: 'laxmi',
            name: 'laxmi',
            id: '1234566'
        }
    })
    test('call the BlogDetails component', async () => {
        render(<Blog blog={blog} user={User} />)
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        const { container } = render(<BlogDetails blog={blog} />)
        const showAuthor = container.querySelector('.author')
        const showUrl = container.querySelector('.url')
        const showLikes = container.querySelector('.likes')


        expect(showAuthor).toHaveTextContent('usha')
        expect(showUrl).toHaveTextContent('kathmandupost.com')
        expect(showLikes).toHaveTextContent(11)
    })

    test('clicking like button for twice', async () => {
        const mockHandler = jest.fn()
        render(<Blog blog={blog} user={User} update={mockHandler} />)
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        const { container } = render(<BlogDetails blog={blog} update={mockHandler} />)
        const likeButton = container.querySelector('.myLikes')
        await user.click(likeButton)
        await user.click(likeButton)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})

