/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';

import './styles.css';

function CodeExplanation({ children }) {
  const [isToggled, setToggled] = useState(false);

  if (isToggled) {
    return (
      <div className="code-explanation code-explanation--expanded">
        {children}

        <div
          className="code-explanation--toggle"
          onClick={() => setToggled(!isToggled)}
        >
          <i className="feather icon-arrow-up-circle" /> hide
        </div>
      </div>
    );
  }
  return (
    <div className="code-explanation code-explanation--collapsed">
      <div
        className="code-explanation--toggle"
        onClick={() => setToggled(!isToggled)}
      >
        <i className="feather icon-info" /> explain this command
      </div>
    </div>
  );
}

export default CodeExplanation;
