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
    copyToClipboard: () => Promise<void>
  }) => JSX.Element
  code: string
  language: Language
  theme?: PrismTheme
  filename?: string
  showLineNumbers?: boolean
  lineNumberStart?: number
}

export const Code: React.FC<CodeProps> = ({
  children = ({ Preview }) => <Preview />,
  code,
  language = 'javascript',
  theme = DefaultPrismTheme,
  showLineNumbers,
  lineNumberStart = 1,
}) => {
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
          {tokens.map((line, lineIndex) => (
            <div {...getLineProps({ line, key: lineIndex })}>
              {showLineNumbers && <span>{lineIndex + lineNumberStart}</span>}
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )

  return children({
    Preview,
    copyToClipboard: () => navigator.clipboard.writeText(normalizedCode),
  })
}
