import React from 'react';

import classnames from 'classnames';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import './styles.css';

function Avatar({
  bio,
  className,
  github,
  nameSuffix,
  size,
  subTitle,
  vertical
}) {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const {
    metadata: { team }
  } = siteConfig.customFields;
  const member = team.find((member) => member.github === github);

  return (
    <div
      className={classnames('avatar', className, {
        [`avatar--${size}`]: size,
        'avatar--vertical': vertical
      })}
    >
      <img
        className={classnames('avatar__photo', `avatar__photo--${size}`)}
        alt="Avatar"
        src={member.avatar}
      />
      <div className="avatar__intro">
        <div className="avatar__name">
          <a href={member.github} target="_blank" rel="noopener noreferrer">
            {member.name}
          </a>
          {nameSuffix}
        </div>
        {subTitle && <small className="avatar__subtitle">{subTitle}</small>}
        {!subTitle && bio && (
          <small className="avatar__subtitle">{member.bio}</small>
        )}
      </div>
    </div>
  );
}

export default Avatar;
