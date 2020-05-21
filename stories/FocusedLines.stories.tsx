import React from 'react'
import { Code } from '@'
import './styles.css'

export default {
  title: 'Focused lines',
}

export const singleFocusedLine = () => (
  <Code
    code={`
function queryUser(id: User) {
  // Get the user by ID
  return User.findBy({ id })
}
`}
    language="ts"
    showLineNumbers
    focusedLines="2"
  />
)

singleFocusedLine.story = {
  name: 'Single focused line',
}

export const exampleTwo = () => (
  <Code
    code={`
function queryUser(id: User) {
  // Get the user by ID
  return User.findBy({ id })
}
`}
    language="ts"
    focusedLines="2"
  />
)

exampleTwo.story = {
  name: 'Single focused line (no line numbers)',
}

export const exampleThree = () => (
  <Code
    code={`
function queryUser(id: User) {
  // Get the user by ID
  return User.findBy({ id })
}
`}
    language="ts"
    focusedLines="1,3-5"
  />
)

exampleThree.story = {
  name: 'Multiple focused lines',
}
