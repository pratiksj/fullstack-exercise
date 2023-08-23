/* eslint-disable indent */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

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