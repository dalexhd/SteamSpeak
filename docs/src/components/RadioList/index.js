import React from 'react';

import humanizeString from 'humanize-string';

function RadioList({ currentState, humanize, icon, name, setState, values }) {
  if (values.size === 0) return null;

  const valuesArr = Array.from(values);

  return (
    <>
      {valuesArr.map((value, idx) => {
        const label =
          typeof value === 'string' && humanize ? humanizeString(value) : value;

        return (
          <label key={idx} htmlFor={name}>
            <input
              checked={value === currentState}
              name={name}
              onChange={() => setState(value)}
              type="radio"
            />
            {label && (
              <>
                {icon ? <i className={`feather icon-${icon}`} /> : ''} {label}
              </>
            )}
          </label>
        );
      })}
    </>
  );
}

export default RadioList;
