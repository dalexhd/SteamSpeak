---
id: running-steamspeak
title: Running SteamSpeak
---

import Alert from '@site/src/components/Alert';
import CodeBlock from '@theme/CodeBlock';
import CodeExplanation from '@site/src/components/CodeExplanation';
import Tabs from '@theme/Tabs';

There're multiple ways to run SteamSpeak on your machine, so you can choose the one that best suits you.

## One time run

<Alert type="warning" closable="true">

This should only be used for testing purposes.

</Alert>

<CodeBlock className="language-bash" path="~/SteamSpeak">
  yarn run start:server
</CodeBlock>
<CodeExplanation>
  <ol>
    <li>Compile TypeScript on the fly.</li>
    <li>Run SteamSpeak.</li>
  </ol>
</CodeExplanation>

##  Long-running task

<Tabs
  block
  className="rounded"
  defaultValue="systemd"
  values={[
    { label: `Systemd`, value: 'systemd', class: '' },
    { label: `Linux screen`, value: 'screen', class: '' },
    { label: `PM2`, value: 'pm2', class: '' }
  ]}
>
<TabItem value="systemd">

  With systemd you can run the application in the background and enable it to automatically start up when the machine boots.

  Create a systemd service file.

  <CodeBlock className="language-bash" path="~/SteamSpeak">
    nano /etc/systemd/system/steamspeak.service
  </CodeBlock>

  Paste the following content into the file. Remember to replace [...] values.

  ```systemd title=/etc/systemd/system/steamspeak.service
  [Unit]
  Description=SteamSpeak - Steam and TeamSpeak integration, done right!
  After=network.service
  [Service]
  User=[REPLACE WITH YOUR USER NAME]
  Group=[REPLACE WITH YOUR USER GROUP]
  Type=simple
  WorkingDirectory=~/SteamSpeak
  ExecStart=/usr/bin/yarn run start:server
  RestartSec=15
  Restart=always
  StandardOutput=journal
  StandardError=inherit

  [Install]
  WantedBy=multi-user.target
  ```

  Enable the created unit file.

  <CodeBlock className="language-bash" path="~/SteamSpeak">
    systemctl enable steamspeak
  </CodeBlock>

  Enable the created unit file.

  <CodeBlock className="language-bash" path="~/SteamSpeak">
    systemctl start steamspeak
  </CodeBlock>

  Verify if the service is running.

  <CodeBlock className="language-bash" path="~/SteamSpeak">
    systemctl status steamspeak
  </CodeBlock>
</TabItem>

<TabItem value="screen">

  Screen or GNU Screen is a terminal multiplexer. In other words, it means that you can start a screen session and then open any number of windows (virtual terminals) inside that session. Processes running in Screen will continue to run when their window is not visible even if you get disconnected.

  Run the following command to create a detached steamspeak screen.

  <CodeBlock className="language-bash" path="~/SteamSpeak">
    screen -dmS SteamSpeak yarn run start:server
  </CodeBlock>

  In order to attach the running SteamSpeak screen run the following command.

  <CodeBlock className="language-bash" path="~/SteamSpeak">
    screen -R SteamSpeak
  </CodeBlock>

  Now that we are inside the screen, here are some small PRO tips:

  - Press `ctrl+a` + `d` in order to get out of a screen.
  - Press `ctrl+x` in order to destroy the screen.

</TabItem>

<TabItem value="pm2">
<Alert type="info">
Coming soon...
</Alert>
</TabItem>
</Tabs>
