/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';

import queryString from 'query-string';

import './styles.css';

function Steps({ children, headingDepth }) {
  const location = typeof window !== 'undefined' ? window.location : null;
  const issueQueryString = {
    title: `Tutorial on ${location} failed`,
    body: `The tutorial on:\n\n${location}\n\nHere's what went wrong:\n\n<!-- Insert command output and details. Thank you for reporting! :) -->`
  };
  const issueURL = `https://github.com/dalexhd/SteamSpeak/issues/new?${queryString.stringify(
    issueQueryString
  )}`;

  const [feedbackAnswer, setFeedbackAnswer] = useState(null);

  return (
    <div className={`steps steps--h${headingDepth}`}>
      {children}
      {!feedbackAnswer && (
        <div className="steps--feedback">
          How was it? Did this tutorial work?&nbsp;&nbsp;
          <span
            className="button button--sm button--primary"
            onClick={() => setFeedbackAnswer('yes')}
          >
            Yes
          </span>
          &nbsp;&nbsp;
          <a
            href={issueURL}
            target="_blank"
            rel="noopener noreferrer"
            className="button button--sm button--primary"
          >
            No
          </a>
        </div>
      )}
      {feedbackAnswer === 'yes' && (
        <div className="steps--feedback steps--feedback--success">
          Thanks! If you&apos;re enjoying SteamSpeak please consider{' '}
          <a
            href="https://github.com/dalexhd/SteamSpeak/"
            target="_blank"
            rel="noopener noreferrer"
          >
            starring our Github repo
          </a>
          .
        </div>
      )}
    </div>
  );
}

export default Steps;
