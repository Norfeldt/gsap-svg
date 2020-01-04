import React, { useState } from 'react'
import { render, waitForDomChange, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Toggle from './'

describe('when the value is true', () => {
  const ToggleWithState = ({ propsValue }) => {
    const [value, setValue] = useState(propsValue)
    return <Toggle value={value} onClick={() => setValue(!value)} />
  }

  it('renders the "OPEN" text', () => {
    const { queryByText } = render(<ToggleWithState propsValue={true} />)

    expect(queryByText('OPEN')).toBeTruthy()
    // TODO: Should check that it is 'visible' and within the viewbox...
  })

  it('moves the text and knob from right to the left when clicked', async () => {
    // Arrange
    jest.useFakeTimers() // This will throw some GSAP warnings `GSAP target null not found. https://greensock.com`
    const getXYRegex = /[\d\.]+/g

    // Act
    const { container } = render(<ToggleWithState propsValue={true} />)
    jest.runAllTimers()
    const group = container.querySelector('#knob-and-text-group')

    await waitForDomChange({
      container,
    })
    let style = group.getAttribute('style')
    const [xStart, _yStart] = style.match(getXYRegex).map(Number)

    fireEvent.click(container)
    jest.runAllTimers()

    await waitForDomChange({
      container,
    })
    style = group.getAttribute('style')
    const [xEnd, _yEnd] = style.match(getXYRegex).map(Number)

    // Assert
    console.log({
      xStart,
      xEnd,
    })
    expect(xStart).toBeLessThan(xEnd)
  })
})
