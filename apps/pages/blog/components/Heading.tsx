import React from 'react'

type IHeadingLevel = 1 | 2 | 3 | 4| 5

const createHeading = (type: IHeadingLevel): React.ReactElement => {
  const Component = `h${type}`
  return <Component />
}

export default createHeading
