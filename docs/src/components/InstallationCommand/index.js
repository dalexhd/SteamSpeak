import React from 'react';

import CodeBlock from '@theme/CodeBlock';
import CodeExplanation from '@site/src/components/CodeExplanation';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

function InstallationCommand() {
  return (
    <Tabs
      className="mini"
      defaultValue="humans"
      values={[
        { label: <><i className="feather icon-user-check"></i> For Humans</>, value: 'humans', },
        { label: <><i className="feather icon-cpu"></i> For Machines</>, value: 'machines', },
      ]
    }>
      <TabItem value="humans">
        <CodeBlock className="language-bash">
          git clone https://github.com/dalexhd/SteamSpeak.git ~/SteamSpeak && cd ~/SteamSpeak
        </CodeBlock>
        <CodeExplanation>
          <ul>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
            <li>Lorem ipsum dolor sit.</li>
          </ul>
        </CodeExplanation>
      </TabItem>
      <TabItem value="machines">
        <CodeBlock className="language-bash">
          git clone https://github.com/dalexhd/SteamSpeak.git ~/SteamSpeak && cd ~/SteamSpeak
        </CodeBlock>
        <CodeExplanation>
          <ul>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
            <li>Lorem ipsum dolor sit.</li>
          </ul>
        </CodeExplanation>
      </TabItem>
    </Tabs>
  );
}

export default InstallationCommand;
