import React from 'react';

import CodeBlock from '@theme/CodeBlock';
import CodeExplanation from '@site/src/components/CodeExplanation';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

function InstallationCommand() {
  return (
    <div>
      <CodeBlock className="language-bash">
        git clone https://github.com/dalexhd/SteamSpeak.git ~/SteamSpeak && cd ~/SteamSpeak
      </CodeBlock>
      <CodeExplanation>
        <ul>
          <li>Clone the repository on the User's home SteamSpeak directory.</li>
          <li>Navigate to the cloned folder.</li>
        </ul>
      </CodeExplanation>
    </div>
  );
}

export default InstallationCommand;
