import * as React from 'react'
import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
} from 'prism-react-renderer'
import DefaultPrismTheme from 'prism-react-renderer/themes/nightOwl'

export interface CodeProps {
  children: (api: {
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

export const Code: React.FC<CodeProps> = ({
  children = ({ Preview }) => <Preview />,
  code,
  language = 'javascript',
  theme = DefaultPrismTheme,
  showLineNumbers,
  lineNumberStart = 1,
  focusedLines = [],
}) => {
  const [activeFocusedLines, focusLines] = React.useState<number[]>(focusedLines)
  const normalizedCode = React.useMemo(() => code.trim(), [code])

  const Preview = () => (
    <Highlight
      {...defaultProps}
      code={normalizedCode}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {showLineNumbers && (
            <div>
              {tokens.map((_line, lineIndex) => (
                <div
                  className="line-number"
                  data-line-focused={
                    activeFocusedLines.includes(lineIndex) ? 'true' : 'false'
                  }
                >
                  {lineIndex + lineNumberStart}
                </div>
              ))}
            </div>
          )}
          <div>
            {tokens.map((line, lineIndex) => (
              <div
                {...getLineProps({ line, key: lineIndex })}
                data-line-focused={
                  activeFocusedLines.includes(lineIndex) ? 'true' : 'false'
                }
              >
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </div>
        </pre>
      )}
    </Highlight>
  )

  return children({
    Preview,
    focusLines,
    copyToClipboard: () => navigator.clipboard.writeText(normalizedCode),
  })
}
