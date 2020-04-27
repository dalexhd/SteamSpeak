---
last_modified_on: '2020-04-16'
delivery_guarantee: 'best_effort'
component_title: 'Multi Function'
description: 'This plugin allows you to display relevant server information on the configured channels.'
instance: 'first-instance'
issues_url: https://github.com/dalexhd/SteamSpeak/issues?q=is%3Aopen+is%3Aissue
sidebar_label: 'Multi Function|first-instance'
source_url: https://github.com/dalexhd/SteamSpeak/blob/master/packages/server/core/TeamSpeak/plugins/first-instance/multi-function.js
status: 'prod-ready'
title: 'Multi Function'
unsupported_operating_systems: []
---

This plugin allows you to display relevant server information on the configured channels.

## Configuration

```javascript
module.exports.info = {
  name: 'Multi function',
  description:
    'This plugin allows you to display relevant server information on the configured channels.',
  config: {
    enabled: true,
    data: [
      {
        enabled: true,
        channelId: 18,
        name: '» Server ping: [PING]ms'
      },
      {
        enabled: true,
        channelId: 21,
        name: '» Server packet loss: [PACKETLOSS]%'
      },
      {
        enabled: true,
        channelId: 16,
        name: '» Channels count: [CHANNELS]'
      },
      {
        enabled: true,
        channelId: 24,
        name: '» Bytes uploaded: [UPLOAD]'
      },
      {
        enabled: true,
        channelId: 25,
        name: '» Bytes downloaded: [DOWNLOAD]'
      }
    ],
    interval: {
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 5
    }
  }
};
```
