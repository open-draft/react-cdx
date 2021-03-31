import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import { Code, CodeProps } from '../Code'
import '../../themes/nako.css'

const code = `
function produce(quantity) {
  const value = getExtraneousValue(quantity)
  return quantity * value
}
`

export default {
  title: 'Examples/Usage',
  component: Code,
  args: {
    code,
  },
} as Meta

const Template: Story<CodeProps> = (args) => <Code {...args} />

export const Basic = Template.bind({})

export const FocusedLine = Template.bind({})
FocusedLine.args = {
  focusedLines: [{ start: 2 }],
}

export const FocusedLineRange = Template.bind({})
FocusedLineRange.args = {
  focusedLines: [{ start: 2, end: 3 }],
}

export const CustomLineStart = Template.bind({})
CustomLineStart.args = {
  startLineNumber: 8,
}

export const DifferentLanguage = Template.bind({})
DifferentLanguage.args = {
  code: `
<div className="example">Hello world</div>
  `,
  language: 'markup',
}

export const Tokens = Template.bind({})
Tokens.args = {
  tokens: [
    {
      line: 2,
      token: {
        type: 'function',
        content: 'getExtraneousValue',
      },
      onClick({ token, lineNumber }) {
        alert(`Clicked on the token "${token.content}" (line ${lineNumber})`)
      },
    },
  ],
}
