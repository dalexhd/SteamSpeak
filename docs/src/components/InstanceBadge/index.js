/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

function InstanceBadge({ className, instance }) {
  return (
    <>
      {instance === 'first-instance' && (
        <span className={className} title="This plugin works on first instance">
          <i className="feather icon-cpu" /> 1
        </span>
      )}
      {instance === 'second-instance' ? (
        <span
          className={className}
          title="This plugin works on second instance"
        >
          <i className="feather icon-cpu" /> 2
        </span>
      ) : (
        ''
      )}
    </>
  );
}

export default InstanceBadge;
