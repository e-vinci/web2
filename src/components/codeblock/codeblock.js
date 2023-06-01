/**
 * This code is mainly based on :
 * https://malikgabroun.com/blog/syntax-highlighting-in-gatsby-mdx/
 * https://fabiorosado.dev/blog/add-code-highlighting-to-mdx/
 * https://prince.dev/highlight-with-react
 */

import React, { useState } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import rangeParser from 'parse-numeric-range';

import Prism from 'prism-react-renderer/prism';
(typeof global !== 'undefined' ? global : window).Prism = Prism;
require('prismjs/components/prism-java');

// Create a closure that determines if we have
// to highlight the given index
const calculateLinesToHighlight = (range) => {
  const RE = /([\d,-]+)/;
  if (RE.test(range)) {
    const strlineNumbers = RE.exec(range)[1];
    const lineNumbers = rangeParser(strlineNumbers);
    return (index) => lineNumbers.includes(index + 1);
  } else {
    return () => false;
  }
};

const CopyButton = (props) => {
  const [text, setText] = useState('Copy');
  const [isBeingCopied, setIsBeingCopied] = useState(false);

  return (
    <button
      className="codeblock__header__copy-button"
      onClick={() => {
        navigator.clipboard.writeText(props.content);
        setText('Copied!');
        setTimeout(() => {
          setText('Copy');
        }, 1000);
        setIsBeingCopied(true);
        setTimeout(() => {
          setIsBeingCopied(false);
        }, 1000);
      }}
    >
      <FontAwesomeIcon
        icon={faCopy}
        size="2x"
        {...(isBeingCopied ? { pulse: true } : {})}
      />
      {/* {text} */}
    </button>
  );
};

const CodeBlock = (props) => {
  let className = props.children.props.className || '';
  const matches = className.match(/language-(?<lang>.*)/);
  const language =
    matches && matches.groups && matches.groups.lang ? matches.groups.lang : '';

  const { numbered, highlighting } = props;

  const shouldHighlightLine = calculateLinesToHighlight(highlighting);

  return (
    <div className="codeblock">
      <Highlight
        {...defaultProps}
        code={props.children.props.children.trim()}
        language={language}
        theme={theme}
        Prism={Prism}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            <div className="codeblock__header">
              <CopyButton content={props.children.props.children} />
              <span className="codeblock__header__language-name">
                {language}
              </span>
            </div>
            {tokens.map((line, index) => {
              const lineProps = getLineProps({ line, key: index });
              lineProps.className = `${lineProps.className} codeblock__body__line`;
              if (shouldHighlightLine(index)) {
                lineProps.className = `${lineProps.className} codeblock__body__line--highlighted`;
              }
              return (
                <div key={index} {...lineProps}>
                  {numbered && (
                    <span className={'codeblock__body__line__number'}>
                      {index + 1}
                    </span>
                  )}
                  <div className={'codeblock__body__line__content'}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
