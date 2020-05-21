import * as React from 'react'
import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
} from 'prism-react-renderer'
import styled, { css } from 'styled-components'
import DefaultPrismTheme from 'prism-react-renderer/themes/nightOwl'

type FocusedLines = string

export interface CodeProps {
  children?: (api: {
    Preview: React.FC
    setLineFocus: (index: FocusedLines) => void
    copyToClipboard: () => Promise<void>
  }) => JSX.Element
  className?: string
  code: string
  language?: Language
  theme?: PrismTheme
  filename?: string
  showLineNumbers?: boolean
  lineNumberStart?: number
  focusedLines?: FocusedLines
}

const Pre = styled.pre`
  border-radius: 3px;
  font-size: 1rem;
  line-height: 1.4;
  text-align: start;
  padding: 1rem 0;
  overflow: auto;
`

const Line = styled.div<{ showLineNumbers?: boolean }>`
  ${({ showLineNumbers }) =>
    showLineNumbers
      ? css`
          padding: 0 1rem 0 0;
        `
      : css`
          padding: 0 1rem;
        `}
`

const LineNumber = styled.span`
  display: inline-flex;
  justify-content: flex-end;
  margin-right: 0.75rem;
  width: 2em;
  user-select: none;
  opacity: 0.6;
`

export const Code: React.FC<CodeProps> = ({
  children = ({ Preview }) => <Preview />,
  className: classNameOverride,
  code,
  language = 'javascript',
  theme = DefaultPrismTheme,
  showLineNumbers,
  lineNumberStart = 1,
  focusedLines = '',
  ...restProps
}) => {
  const [activeFocusedLines, setLineFocus] = React.useState<string>(
    focusedLines
  )
  const focusedLineNumbers = React.useMemo(() => {
    // transform `activeFocusedLines` to an array of line numbers.
    if (!activeFocusedLines) {
      return []
    }

    return activeFocusedLines
      .split(',')
      .reduce<Array<string | number>>((acc, index) => {
        if (index.includes('-')) {
          const [lowEdge, highEdge] = index.split('-').map(Number)
          const rangeArray = Array(highEdge - lowEdge + 1)
            .fill(null)
            .map((_, index) => {
              return lowEdge + index
            })

          return acc.concat(rangeArray)
        }

        return acc.concat(index)
      }, [])
      .map(Number)
  }, [activeFocusedLines])

  const normalizedCode = React.useMemo(() => code.trim(), [code])
  const joinClassNames = React.useCallback(
    className => {
      return [className, classNameOverride].filter(Boolean).join(' ')
    },
    [classNameOverride]
  )

  const getLineNumberClass = React.useCallback(
    (lineIndex: number) => {
      return [
        'line-number',
        focusedLineNumbers.includes(lineIndex + 1) && 'line-number-focused',
      ]
        .filter(Boolean)
        .join(' ')
    },
    [focusedLineNumbers]
  )

  const Preview = () => (
    <Highlight
      {...defaultProps}
      {...restProps}
      code={normalizedCode}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={joinClassNames(className)} style={style}>
          {tokens.map((line, lineIndex) => (
            <Line
              {...getLineProps({ line, key: lineIndex })}
              className={getLineNumberClass(lineIndex)}
              showLineNumbers={showLineNumbers}
            >
              {showLineNumbers && (
                <LineNumber>{lineIndex + lineNumberStart}</LineNumber>
              )}
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </Line>
          ))}
        </Pre>
      )}
    </Highlight>
  )

  return children({
    Preview,
    setLineFocus,
    copyToClipboard: () => navigator.clipboard.writeText(normalizedCode),
  })
}
