import React from 'react';

import CodeBlock from '@theme/CodeBlock';
import moment from 'moment';

function ServerName() {
  const [name, setName] = React.useState(
    'SteamSpeak Server - [DATE] - [[ONLINE]/[MAX_CLIENTS] | [%]%]'
  );

  function tick() {
    const online = Math.floor(Math.random() * (340 - 310)) + 340;
    const editedName = {
      '[ONLINE]': online,
      '[MAX_CLIENTS]': 512,
      '[DATE]': moment().format('DD-MM-YYYY HH:mm:ss'),
      '[%]': Math.round((online * 100) / 512)
    };
    let name = 'SteamSpeak Server - [DATE] - [[ONLINE]/[MAX_CLIENTS] | [%]%]';
    for (const key in editedName)
      if (Object.prototype.hasOwnProperty.call(editedName, key))
        name = name.replace(key, editedName[key]);
    setName(name);
  }

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  return <span>{name}</span>;
}

function ConfigurationExample() {
  return (
    <div>
      <ServerName />
      <CodeBlock className="language-javascript">
        {`module.exports.info = {
  name: 'Server name',
  description: 'This plugin allows you to provide useful information to your server clients by changing the server name.',
  config: {
    enabled: true,
    data: {
      showQueryClients: false,
      serverName: 'SteamSpeak Server - [DATE] - [[ONLINE]/[MAX_CLIENTS] | [%]%]',
      format: 'DD-MM-YYYY HH:mm:ss'
    },
    interval: {
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 1
    }
}`}
      </CodeBlock>
    </div>
  );
}

export default ConfigurationExample;
