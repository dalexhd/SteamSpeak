import React from 'react';

import CodeBlock from '@theme/CodeBlock';
import CodeExplanation from '@site/src/components/CodeExplanation';
import Alert from '@site/src/components/Alert';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';

function InstallationCommand() {
  return (
    <div>
      <Alert fill type="warning">
        Nightly versions contain bleeding edge changes that may
        contain bugs. Proceed with caution or download a stable version from <Link to={useBaseUrl('/releases')}>Releases link</Link> ◀️ RECOMENDED OPTION FOR MOST USERS
      </Alert>
      <CodeBlock className="language-bash">
        git clone https://github.com/dalexhd/SteamSpeak.git ~/SteamSpeak && cd
        ~/SteamSpeak
      </CodeBlock>
      <CodeExplanation>
        <ul>
          <li>
            Clone the repository on the User&apos;s home SteamSpeak directory.
          </li>
          <li>Navigate to the cloned folder.</li>
        </ul>
      </CodeExplanation>
    </div>
  );
}

export default InstallationCommand;
