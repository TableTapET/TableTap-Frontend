import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home Page', () => {
  it('renders successfully without crashing', () => {
    render(<Home />)
    
    // This expects to find a main element or heading on your page. 
    const element = screen.getByRole('main')
    expect(element).toBeInTheDocument()
  })
})