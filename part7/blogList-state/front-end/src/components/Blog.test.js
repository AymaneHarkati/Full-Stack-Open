import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
describe('Blog component tests', () => {
  let blog = {
    title:"React patterns",
    author:"Michael Chan",
    url:"https://reactpatterns.com/",
    likes:7,
    user : {
      username : "michael Chan",
    }
  }

  let mockUpdateBlog = jest.fn()
  let mockDeleteBlog = jest.fn()

  test('renders title and author', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
    )
    expect(component.container).toHaveTextContent(
      'Title : React patterns'
    )
  })

  test('clicking the view button displays url and number of likes', async () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Blog blog={blog} handleUpdate={mockUpdateBlog} removeBlog={mockDeleteBlog} />
    )

    // eslint-disable-next-line testing-library/prefer-screen-queries
  
    const user = userEvent.setup()
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const button = component.getByText('view')
    await user.click(button)

    expect(component.container).toHaveTextContent(
      'https://reactpatterns.com/'
    )

    expect(component.container).toHaveTextContent(
      '7'
    )
  })
})