import React from 'react';

import Link from '@docusaurus/Link';

import classnames from 'classnames';

import './styles.css';

function Jump({
  children,
  className,
  badge,
  leftIcon,
  rightIcon,
  size,
  target,
  to
}) {
  const classes = classnames('jump-to', `jump-to--${size}`, className);

  const content = (
    <div className="jump-to--inner">
      <div className="jump-to--inner-2">
        {leftIcon && (
          <div className="jump-to--left">
            <i className={`feather icon-${leftIcon}`} />
          </div>
        )}
        <div className="jump-to--main">
          {badge ? (
            <span className="badge badge--primary badge--right">{badge}</span>
          ) : (
            ''
          )}
          {children}
        </div>
        <div className="jump-to--right">
          <i className={`feather icon-${rightIcon || 'chevron-right'} arrow`} />
        </div>
      </div>
    </div>
  );

  return target ? (
    <a href={to} target={target} className={classes}>
      {content}
    </a>
  ) : (
    <Link to={to} className={classes}>
      {content}
    </Link>
  );
}

export default Jump;
