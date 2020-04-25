import React from 'react';

import CodeBlock from '@theme/CodeBlock';
import CodeExplanation from '@site/src/components/CodeExplanation';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import moment from 'moment';

function ServerName(props) {
  const [ name, setName ] = React.useState('SteamSpeak Server - [DATE] - [[ONLINE]/[MAX_CLIENTS] | [%]%]');
  React.useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
      let online = Math.floor(Math.random() * (340 - 310) ) + 340;
      let edited_name = {
        '[ONLINE]': online,
        '[MAX_CLIENTS]': 512,
        '[DATE]': moment().format('DD-MM-YYYY HH:mm:ss'),
        '[%]': Math.round((online * 100) / 512)
      };
      let name = 'SteamSpeak Server - [DATE] - [[ONLINE]/[MAX_CLIENTS] | [%]%]';
      for (var key in edited_name) {
        if (!edited_name.hasOwnProperty(key)) continue;
        name = name.replace(key, edited_name[key]);
      }
      setName(name);
  }

  return (
    <span>{name}</span>
  );
}

function ConfigurationExample() {
  return (
  <div>
    <ServerName />
    <CodeBlock className="language-javascript">
{`module.exports.info = {
  name: 'Server name',
  desc: 'Change server name.',
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
