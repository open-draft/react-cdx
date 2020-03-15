import * as React from 'react'
import { CodeProps } from './Code'

type CodeWithVariantsProps = {
  variants: CodeVariant[]
  children: (api: {
    variants: CodeVariant[]
    activeVariant: CodeVariant
    setVariant: (index: number) => void
  }) => JSX.Element
}

type CodeVariant = {
  name: string
} & Omit<CodeProps, 'children'>

export const CodeWithVariants: React.FC<CodeWithVariantsProps> = ({
  variants,
  children,
}) => {
  const [activeVariantIndex, setVariant] = React.useState(0)
  const activeVariant = React.useMemo(() => variants[activeVariantIndex], [
    variants,
    activeVariantIndex,
  ])

  return (
    <div>
      {/* <p>
        All variants:{' '}
        {variants.map((variant, index) => (
          <button onClick={() => setVariant(index)}>{variant.name}</button>
        ))}
      </p>
      <Code code={activeVariant.code} language="javascript" /> */}
      {children({ variants, activeVariant, setVariant })}
    </div>
  )
}
