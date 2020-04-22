import React from 'react';
import Link from '@docusaurus/Link';
import classnames from 'classnames';
import './styles.css';
import SVG from 'react-inlinesvg';
import useBaseUrl from '@docusaurus/useBaseUrl';

function Vic({className, size, style, text}) {
  return <div className="icon">
      <SVG src={useBaseUrl(`img/not-found.svg`)} alt="Not found" width="200" height="250" />
    </div>
}

export default Vic;
