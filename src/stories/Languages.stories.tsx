import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import { Code, CodeProps } from '../Code'

import '../../themes/nako.css'

export default {
  title: 'Examples/Languages',
  component: Code,
} as Meta

const Template: Story<CodeProps> = (args) => <Code {...args} />

export const JavaScript = Template.bind({})
JavaScript.args = {
  language: 'javascript',
  code: `
function multiply(a, b) {
  return a * b
}
  `,
}

export const TypeScript = Template.bind({})
TypeScript.title = 'Foo'
TypeScript.args = {
  language: 'typescript',
  code: `
function multiply(a: number, b: number): number {
  return a * b
}
  `,
}

export const Css = Template.bind({})
Css.args = {
  language: 'css',
  code: `
.container {
  max-width: 960px;
  margin: auto;
}
  `,
}

export const Ruby = Template.bind({})
Ruby.args = {
  language: 'ruby',
  code: `
def alternating_characters?(s)
  type = [/[aeiou]/, /[^aeiou]/].cycle
  if s.start_with?(/[^aeiou]/)
    type.next
  end
  s.chars.all? { |ch| ch.match?(type.next) }
end
  `,
}

export const Bash = Template.bind({})
Bash.args = {
  language: 'bash',
  code: `
for (( counter=10; counter>0; counter-- ))
do
echo -n "$counter"
done
printf ""
  `,
}
