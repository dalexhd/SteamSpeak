import React from 'react';

import humanizeString from 'humanize-string';

function CheckboxList({
  currentState,
  humanize,
  icon,
  name,
  setState,
  values
}) {
  if (values.size === 0) return null;

  const valuesArr = Array.from(values);

  return (
    <>
      {valuesArr.map((value, idx) => {
        const label =
          typeof value === 'string' && humanize ? humanizeString(value) : value;

        return (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label key={idx}>
            <input
              checked={currentState.has(value)}
              name={name}
              onChange={(event) => {
                const newValues = new Set(currentState);

                if (event.currentTarget.checked) newValues.add(value);
                else newValues.delete(value);

                setState(newValues);
              }}
              type="checkbox"
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

export default CheckboxList;
