/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import classnames from 'classnames';
import CodeBlock from '@theme/CodeBlock';

//
// Misc
//

function isObject(a) {
  return !!a && a.constructor === Object;
}

//
// TOML
//

function keyToTOML(key) {
  if (key.includes('.')) {
    return `"${key}"`;
  }
  return key;
}

function valueToTOML(value) {
  if (typeof value === 'string' && value.includes('\n')) {
    return `"""
${value}
"""`;
  }
  return JSON.stringify(value);
}

function kvToTOML(name, example) {
  if (isObject(example)) {
    if ('name' in example && 'value' in example) {
      return `${keyToTOML(example.name)} = ${valueToTOML(example.value)}`;
    }
    return `${keyToTOML(Object.keys(example)[0])} = ${valueToTOML(
      Object.values(example)[0]
    )}`;
  }
  if (name) {
    return `${keyToTOML(name)} = ${valueToTOML(example)}`;
  }
  return valueToTOML(example);
}

//
// Enum
//

function Enum({ values }) {
  const elements = [];

  if (!Array.isArray(values)) {
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        elements.push(
          <code key={key} className="with-info-icon" title={values[key]}>
            {valueToTOML(key)}
          </code>
        );
        elements.push(' ');
      }
    }
  } else {
    for (const index in values) {
      if (Object.prototype.hasOwnProperty.call(values, index)) {
        const value = values[index];
        elements.push(<code key={value}>{valueToTOML(value)}</code>);
        elements.push(' ');
      }
    }
  }

  return elements;
}

function Examples({ name, path, values }) {
  let code = '';

  values.forEach((value) => {
    if (path) {
      code += `${path}.`;
    }

    code += `${kvToTOML(name, value)}\n`;
  });

  return (
    <div>
      <CodeBlock className="language-toml">{code}</CodeBlock>
    </div>
  );
}

//
// Values
//

function Value({ unit, value }) {
  let unitText = '';

  if (unit) {
    unitText = <> ({unit})</>;
  }

  return (
    <>
      <code>{valueToTOML(value)}</code>
      {unitText}
    </>
  );
}

//
// Relevance
//

function RelevantWhen({ value }) {
  const relKey = Object.keys(value)[0];
  let relValue = Object.values(value)[0];

  if (relValue === '') {
    relValue = null;
  }

  return (
    <span>
      <code>
        <a href={`#${relKey}`}>{relKey}</a>
      </code>{' '}
      = <code>{valueToTOML(relValue)}</code>
    </span>
  );
}

//
// Fields
//

function FieldFooter({
  defaultValue,
  enumValues,
  examples,
  groups,
  name,
  path,
  relevantWhen,
  required,
  unit,
  warnings
}) {
  const [showExamples, setShowExamples] = useState(false);

  if (
    defaultValue ||
    enumValues ||
    (examples && examples.length > 0) ||
    (groups && groups.length > 0)
  ) {
    return (
      <ul className="info">
        {warnings &&
          warnings.length > 0 &&
          warnings.map((warning, idx) => (
            <li key={idx} className="warning">
              <i className="feather icon-alert-triangle" /> WARNING:{' '}
              {warning.text}
            </li>
          ))}
        {relevantWhen ? (
          <li>
            Only {required ? 'required' : 'relevant'} when:{' '}
            <RelevantWhen value={relevantWhen} />
          </li>
        ) : null}
        {defaultValue !== undefined ? (
          defaultValue !== null ? (
            <li>
              Default: <Value unit={unit} value={defaultValue} />
            </li>
          ) : (
            <li>No default</li>
          )
        ) : null}
        {enumValues ? (
          <li>
            Enum, must be one of: <Enum values={enumValues} />
          </li>
        ) : null}
        <li>
          <div
            className="show-more"
            onClick={() => setShowExamples(!showExamples)}
          >
            {showExamples ? 'Hide examples' : 'View examples'}
          </div>
          {showExamples && (
            <Examples name={name} path={path} values={examples} />
          )}
        </li>
      </ul>
    );
  }
  return null;
}

function Field({
  children,
  common,
  defaultValue,
  enumValues,
  examples,
  groups,
  name,
  path,
  relevantWhen,
  required,
  type,
  unit,
  warnings
}) {
  const [collapse] = useState(false);

  let filteredChildren = children;

  if (collapse) {
    filteredChildren = filteredChildren.filter(
      (child) => child.props.originalType !== 'p'
    );
  }

  return (
    <li
      className={classnames({
        'field-required': required,
        'field-collapsed': collapse
      })}
      required={required}
    >
      <div className="badges">
        {groups &&
          groups.map((group, idx) => (
            <span key={idx} className="badge badge--secondary">
              {group}
            </span>
          ))}
        {type && (
          <span className="badge badge--secondary">
            {type}
            {unit && <> ({unit})</>}
          </span>
        )}
        {enumValues && Object.keys(enumValues).length > 0 && (
          <span
            className="badge badge--secondary with-info-icon"
            title="This option is an enumation and only allows specific values"
          >
            enum
          </span>
        )}
        {common && (
          <span
            className="badge badge--primary with-info-icon"
            title="This is a popular that we recommend for getting started"
          >
            common
          </span>
        )}
        {required ? (
          <span className="badge badge--danger">
            required{relevantWhen && '*'}
          </span>
        ) : (
          <span className="badge badge--secondary">optional</span>
        )}
      </div>
      {filteredChildren}
      {!collapse && type !== 'table' && (
        <FieldFooter
          defaultValue={defaultValue}
          enumValues={enumValues}
          examples={examples}
          groups={groups}
          name={name}
          path={path}
          relevantWhen={relevantWhen}
          required={required}
          unit={unit}
          warnings={warnings}
        />
      )}
    </li>
  );
}

export default Field;
