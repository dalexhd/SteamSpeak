import React from 'react';

import CodeBlock from '@theme/CodeBlock';
import CodeExplanation from '@site/src/components/CodeExplanation';

function InstallationCommand() {
  return (
    <div>
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
