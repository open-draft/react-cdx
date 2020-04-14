import * as React from 'react'
import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
} from 'prism-react-renderer'
import styled from 'styled-components'
import DefaultPrismTheme from 'prism-react-renderer/themes/nightOwl'

export interface CodeProps {
  children?: (api: {
    Preview: React.FC
    focusLines: (index: number[]) => void
    copyToClipboard: () => Promise<void>
  }) => JSX.Element
  code: string
  language: Language
  theme?: PrismTheme
  filename?: string
  showLineNumbers?: boolean
  lineNumberStart?: number
  focusedLines?: number[]
}

const Pre = styled.pre<{ showLineNumbers?: boolean }>`
  border-radius: 3px;
  font-size: 1rem;
  line-height: 1.4;
  text-align: start;
  padding: ${({ showLineNumbers }) =>
    showLineNumbers ? '1rem 1rem 1rem 0' : '1rem'};
  overflow: auto;
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
  code,
  language = 'javascript',
  theme = DefaultPrismTheme,
  showLineNumbers,
  lineNumberStart = 1,
  focusedLines = [],
  ...restProps
}) => {
  const [activeFocusedLines, focusLines] = React.useState<number[]>(
    focusedLines
  )
  const normalizedCode = React.useMemo(() => code.trim(), [code])

  const getLineNumberClass = (lineIndex: number) => {
    return [
      'line-number',
      activeFocusedLines.includes(lineIndex + 1) && 'line-number-focused',
    ]
      .filter(Boolean)
      .join(' ')
  }

  const Preview = () => (
    <Highlight
      {...defaultProps}
      {...restProps}
      code={normalizedCode}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre
          className={className}
          style={style}
          showLineNumbers={showLineNumbers}
        >
          {tokens.map((line, lineIndex) => (
            <div
              {...getLineProps({ line, key: lineIndex })}
              className={getLineNumberClass(lineIndex)}
            >
              {showLineNumbers && (
                <LineNumber>{lineIndex + lineNumberStart}</LineNumber>
              )}
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Pre>
      )}
    </Highlight>
  )

  return children({
    Preview,
    focusLines,
    copyToClipboard: () => navigator.clipboard.writeText(normalizedCode),
  })
}
