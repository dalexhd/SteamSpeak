import React from 'react';
import './styles.css';
import SVG from 'react-inlinesvg';
import useBaseUrl from '@docusaurus/useBaseUrl';

function Vic() {
  return (
    <div className="icon">
      <SVG
        src={useBaseUrl(`img/not-found.svg`)}
        alt="Not found"
        width="200"
        height="250"
      />
    </div>
  );
}

export default Vic;
