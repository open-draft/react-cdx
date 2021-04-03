# React CDX

Code snippet rendering and interaction library for React.

## Features

- 💅 Styling-agnostic (raw CSS, CSS-in-JS, pre-built themes).
- 🎯 Focused lines.
- 💎 Interactive code tokens.

## Getting started

```bash
npm install react-cdx
```

```jsx
import React from 'react'
import { Code } from 'react-cdx'

export function Example() {
  return (
    <Code
      code={`
function multiply(a, b) {
  return a * b
}
    `}
    />
  )
}
```
