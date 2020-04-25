---
last_modified_on: '2020-04-16'
delivery_guarantee: 'best_effort'
component_title: 'Change channel.'
description: 'This plugin allows you to change multiple channels name at diferent interval.'
instance: 'second-instance'
issues_url: https://github.com/dalexhd/SteamSpeak/issues?q=is%3Aopen+is%3Aissue
sidebar_label: 'Change Channel|second-instance'
source_url: https://github.com/dalexhd/SteamSpeak/blob/master/packages/server/core/TeamSpeak/plugins/second-instance/change_channel.js
status: 'prod-ready'
title: 'Change Channel'
unsupported_operating_systems: []
---

This plugin allows you to change multiple channels name at diferent interval.

## Configuration

```javascript
module.exports.info = {
  name: 'Change channel',
  description:
    'This plugin allows you to change multiple channels name at diferent interval.',
  config: {
    enabled: true,
    data: [
      {
        enabled: true,
        channelId: 118,
        changes: [
          {
            channel_name: '[cspacer]Wellcome',
            channel_description: 'Wellcome'
          },
          {
            channel_name: '[cspacer]to',
            channel_description: 'to'
          },
          {
            channel_name: '[cspacer]SteamSpeak',
            channel_description: 'SteamSpeak'
          }
        ],
        interval: {
          weeks: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 3
        }
      }
    ]
  }
};
```
