---
last_modified_on: '2020-04-16'
delivery_guarantee: 'best_effort'
component_title: 'AFK Move'
description: 'This plugin allows you to automatically move afk people after x time to your desired channel.'
instance: 'second-instance'
issues_url: https://github.com/dalexhd/SteamSpeak/issues?q=is%3Aopen+is%3Aissue
sidebar_label: 'AFK Move|second-instance'
source_url: https://github.com/dalexhd/SteamSpeak/blob/master/packages/server/core/TeamSpeak/plugins/second-instance/afk_move.js
status: 'prod-ready'
title: 'AFK Move'
unsupported_operating_systems: []
---

This plugin allows you to automatically move afk people after x time to your desired channel.

## Configuration

```javascript
module.exports.info = {
  name: 'AFK move',
  description:
    'This plugin allows you to automatically move afk people after x time to your desired channel.',
  config: {
    enabled: false,
    data: {
      ignoredGroups: [],
      ignoredChannels: [],
      minTime: {
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 5
      }
    },
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
