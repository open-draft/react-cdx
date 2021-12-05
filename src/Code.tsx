import * as React from 'react'
import Highlight, { Language, defaultProps } from 'prism-react-renderer'
import { joinClassNames } from './utils/joinClassNames'

export interface CodeProps {
  className?: string
  code: string
  language?: Language
  showNumbers?: boolean
  startLineNumber?: number
  formatLineNumber?(lineNumber: number): JSX.Element
  focusedLines?: LineRange[]
  tokens?: TokenDefinition[]
}

export interface LineRange {
  start: number
  end?: number
}

export interface PrismRendererToken {
  content: string
  types: string[]
}

export interface TokenDefinition {
  line: number
  token: Omit<PrismRendererToken, 'types'> & { type: string }
  render?(token: PrismRendererToken): JSX.Element
  onClick?(args: { token: PrismRendererToken; lineNumber: number }): void
}

function isFocusedLine(lineNumber: number, focusedLines: LineRange[]): boolean {
  return focusedLines.some((range) => {
    return lineNumber >= range.start && lineNumber <= (range.end || range.start)
  })
}

function findToken(
  lineNumber: number,
  token: PrismRendererToken,
  tokens: TokenDefinition[] = []
) {
  return tokens.find((tokenDefinition) => {
    const sameLine = lineNumber === tokenDefinition.line
    const sameTokenType = token.types.includes(tokenDefinition.token.type)
    const sameTokenContent =
      tokenDefinition.token.content === token.content.trim()

    return sameLine && sameTokenType && sameTokenContent
  })
}

export function Code({
  className,
  code,
  language = 'javascript',
  showNumbers,
  startLineNumber,
  formatLineNumber,
  focusedLines,
  tokens: interactiveTokens,
}: CodeProps) {
  const lines = code.trim().split('\n')
  const shouldDisplayLineNumbers =
    showNumbers ?? (lines.length > 1 || startLineNumber)

  return (
    <Highlight
      {...defaultProps}
      theme={null}
      code={code.trim()}
      language={language}
    >
      {({
        className: containerClassName,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <pre
          className={joinClassNames(containerClassName, className)}
          style={style}
        >
          {tokens.map((line, key) => {
            const lineNumber = key + (startLineNumber || 1)
            const isFocused = isFocusedLine(lineNumber, focusedLines || [])
            const focusedClassName =
              focusedLines?.length > 0
                ? isFocused
                  ? 'focused'
                  : 'unfocused'
                : null

            return (
              <div
                {...getLineProps({ line, key })}
                className={joinClassNames('line', focusedClassName)}
              >
                {shouldDisplayLineNumbers && (
                  <span className="line-number">
                    {formatLineNumber?.(lineNumber) ?? lineNumber}
                  </span>
                )}
                <span className="line-content">
                  {line.map((token, key) => {
                    const tokenProps = getTokenProps({ token, key })
                    const interactiveToken = findToken(
                      lineNumber,
                      token,
                      interactiveTokens
                    )
                    const tokenClassName = joinClassNames(
                      tokenProps.className,
                      interactiveToken && 'interactive'
                    )

                    // Prevent treating leading/trailing whitespace
                    // as a part of the token.
                    const [, leadingSpace] =
                      token.content.match(/^(\s+).+/g) || []
                    const [, trailingSpace] =
                      token.content.match(/\w+(\s+)$/g) || []
                    const shouldTrimContent = !!leadingSpace || !!trailingSpace

                    if (shouldTrimContent) {
                      token.content = token.content.trim()
                    }

                    return (
                      <React.Fragment key={key}>
                        {leadingSpace && (
                          <span
                            {...tokenProps}
                            key={`${lineNumber}-leading-${key}`}
                          >
                            {leadingSpace}
                          </span>
                        )}
                        <span
                          {...tokenProps}
                          className={tokenClassName}
                          onClick={interactiveToken?.onClick?.bind(this, {
                            token,
                            lineNumber,
                          })}
                        >
                          {interactiveToken?.render?.(token) || token.content}
                        </span>
                        {trailingSpace && (
                          <span
                            {...tokenProps}
                            key={`${lineNumber}-trailing-${key}`}
                          >
                            {trailingSpace}
                          </span>
                        )}
                      </React.Fragment>
                    )
                  })}
                </span>
              </div>
            )
          })}
        </pre>
      )}
    </Highlight>
  )
}
