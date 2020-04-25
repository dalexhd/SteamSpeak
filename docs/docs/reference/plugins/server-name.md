---
last_modified_on: '2020-04-16'
delivery_guarantee: 'best_effort'
component_title: 'Server Name'
description: 'This plugin allows you to provide useful information to your server clients by changing the server name.'
instance: 'first-instance'
issues_url: https://github.com/dalexhd/SteamSpeak/issues?q=is%3Aopen+is%3Aissue
sidebar_label: 'Server Name|first-instance'
source_url: https://github.com/dalexhd/SteamSpeak/blob/master/packages/server/core/TeamSpeak/plugins/serverName.js
status: 'prod-ready'
title: 'Server Name'
unsupported_operating_systems: []
---

This plugin allows you to provide useful information to your server clients by changing the server name.

## Configuration

```javascript
module.exports.info = {
  name: 'Server name',
  description:
    'This plugin allows you to provide useful information to your server clients by changing the server name.',
  config: {
    enabled: true,
    data: {
      showQueryClients: false,
      serverName:
        'SteamSpeak Server - [DATE] - [[ONLINE]/[MAX_CLIENTS] | [%]%]',
      format: 'DD-MM-YYYY HH:mm'
    },
    interval: {
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 1,
      seconds: 0
    }
  }
};
```
