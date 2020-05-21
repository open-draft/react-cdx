import * as React from 'react'
import { CodeProps } from './Code'

type CodeWithVariantsProps = {
  variants: CodeVariant[]
  children: (api: {
    variants: CodeVariant[]
    activeVariant: CodeVariant
    activeIndex: number
    setVariantIndex: (index: number) => void
  }) => JSX.Element
}

type CodeVariant = {
  name: string
  codeProps: Omit<CodeProps, 'children'>
}

export const CodeWithVariants: React.FC<CodeWithVariantsProps> = ({
  variants,
  children,
}) => {
  const [activeVariantIndex, setActiveVariantIndex] = React.useState(0)
  const activeVariant = React.useMemo(() => variants[activeVariantIndex], [
    variants,
    activeVariantIndex,
  ])

  const setVariantIndex = (nextIndex: number) => {
    setActiveVariantIndex(nextIndex)
  }

  return children({
    variants,
    activeVariant,
    activeIndex: activeVariantIndex,
    setVariantIndex,
  })
}
