import React from 'react'
import { Code, CodeWithVariants } from '@'
// import './main.css'

export default {
  title: 'Code',
}

export const basicUsage = () => (
  <Code
    code={`
function queryUser(id: User) {
  // Get the user by ID
  return User.findBy({ id })
}
`}
    language="ts"
    showLineNumbers
    focusedLine={2}
  >
    {({ Preview, copyToClipboard }) => (
      <div>
        <Preview />
        <p>Custom markup</p>
        <button onClick={copyToClipboard}>Copy</button>
      </div>
    )}
  </Code>
)

basicUsage.story = {
  name: 'Basic usage',
}

//
//
// =======================================================
//
//

export const variantsUsage = () => (
  <CodeWithVariants
    variants={[
      {
        name: 'JavaScript',
        code: `
// Retrieve all users
const allUsers = await prisma.users()

// Retrieve a single user by email
const bob = await prisma
  .users({ email: "bob@prisma.io" })

// Retrieve all comments of a post in a single request
const commentsOfPost = await prisma
  .post({ id: "cjl4srkaqqxa30b46pqcyzpyo" })
  .comments()
        `,
      },
      {
        name: 'TypeScript',
        language: 'typescript',
        code: `
// Retrieve all users
const allUsers: User[] = await prisma.users()

// Retrieve a single user by email
const bob: User = await prisma
  .users({ email: "bob@prisma.io" })

// Retrieve all comments of a post in a single request
const commentsOfPost: Comment[] = await prisma
  .post({ id: "cjl4srkaqqxa30b46pqcyzpyo" })
  .comments()
        `,
      },
      {
        name: 'Go',
        language: 'go',
        code: `
// Retrieve all users
allUsers, err := client.Users(nil).Exec(ctx)
        `,
      },
    ]}
  >
    {({ variants, activeVariant, setVariant }) => (
      <div>
        <p>
          All variants:{' '}
          {variants.map((variant, index) => (
            <button key={index} onClick={() => setVariant(index)}>
              {variant.name}
            </button>
          ))}
        </p>
        <Code {...activeVariant} showLineNumbers />
      </div>
    )}
  </CodeWithVariants>
)

//
//
// =======================================================
//
//

export const CodeWithSteps = () => {
  return (
    <CodeWithVariants
      variants={[
        {
          name: 'Imports',
          code: `
import { composeMocks, rest } from 'msw'
          `,
        },
        {
          name: 'Define mocks',
          code: `
composeMocks(
  rest.get('https://api.github.com/user/octocat', (req, res, ctx) => {
    return res(
      ctx.status(203),
      ctx.json({
        firstName: 'John'
      })
    )
  })
)
          `,
        },
      ]}
    >
      {({ variants, activeVariant, activeIndex, setVariant }) => (
        <div>
          <h3>{activeVariant.name}</h3>
          <Code {...activeVariant} showLineNumbers />
          <div>
            <button onClick={() => setVariant(activeIndex - 1)}>Prev</button>
            <button onClick={() => setVariant(activeIndex + 1)}>Next</button>
          </div>
        </div>
      )}
    </CodeWithVariants>
  )
}

CodeWithSteps.story = {
  name: 'With steps',
}
