---
last_modified_on: '2020-04-16'
delivery_guarantee: 'best_effort'
component_title: 'Host Message'
description: 'This plugin allows you to change default host message with useful server information.'
instance: 'first-instance'
issues_url: https://github.com/dalexhd/SteamSpeak/issues?q=is%3Aopen+is%3Aissue
sidebar_label: 'Host Message|first-instance'
source_url: https://github.com/dalexhd/SteamSpeak/blob/master/packages/server/src/core/TeamSpeak/plugins/first-instance/host_message.ts
status: 'prod-ready'
title: 'Host Message'
unsupported_operating_systems: []
---

This plugin allows you to change default host message with useful server information.

## Configuration

```typescript
export const info: CommonPluginConfig = {
	name: 'Host message',
	description:
		'This plugin allows you to change default host message with useful server information.',
	config: {
		enabled: false,
		data: {
			showQueryClients: false,
			hostMessage: `
			Welcome to [b]my server[/b]![b][color=orange][SERVER_ONLINE]/[SERVER_MAX_CLIENTS][/color][/b] users online!
			[b][url=https://git.io/JfLyF][color=orange]Visit github[/color][/url][/b]`
		},
		interval: {
			weeks: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 30
		}
	}
};
```
