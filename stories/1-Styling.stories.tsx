import React from 'react'
import styled from 'styled-components'
import { Code } from '@'

export default {
  title: 'Styling',
}

const StyledCode = styled(Code)`
  border: 10px solid blue;
  box-shadow: 0 10px 10px red;
`

export const basicUsage = () => (
  <StyledCode
    code={`
function queryUser(id: User) {
  // Get the user by ID
  return User.findBy({ id })
}
`}
    language="ts"
    showLineNumbers
    focusedLine={2}
  />
)

basicUsage.story = {
  name: 'Styles override',
}
