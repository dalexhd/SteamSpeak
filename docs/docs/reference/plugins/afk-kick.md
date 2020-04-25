---
last_modified_on: '2020-04-16'
delivery_guarantee: 'best_effort'
component_title: 'AFK Kick'
description: 'This plugin allows you to automatically kick afk people after x time.'
instance: 'second-instance'
issues_url: https://github.com/dalexhd/SteamSpeak/issues?q=is%3Aopen+is%3Aissue
sidebar_label: 'AFK Kick|second-instance'
source_url: https://github.com/dalexhd/SteamSpeak/blob/master/packages/server/core/TeamSpeak/plugins/second-instance/afk-kick.js
status: 'prod-ready'
title: 'AFK Kick'
unsupported_operating_systems: []
---

This plugin allows you to automatically kick afk people after x time.

## Configuration

```javascript
module.exports.info = {
  name: 'AFK move',
  description:
    'This plugin allows you to automatically kick afk people after x time.',
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
