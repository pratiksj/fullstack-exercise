/* eslint-disable indent */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const title = screen.getByPlaceholderText('title')
    const author = screen.getByPlaceholderText('author')
    const url = screen.getByPlaceholderText('url')

    const sendButton = screen.getByText('create')

    await user.type(title, 'pani paryo')
    await user.type(author, 'usha')
    await user.type(url, 'onlinekhabar.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('pani paryo')
    expect(createBlog.mock.calls[0][0].author).toBe('usha')
    expect(createBlog.mock.calls[0][0].url).toBe('onlinekhabar.com')
})