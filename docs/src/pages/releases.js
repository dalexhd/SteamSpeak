import React from 'react';
import { Redirect } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

function Download() {
  return <Redirect to={useBaseUrl('/releases/latest/download')} />;
}

export default Download;
