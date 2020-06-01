---
last_modified_on: '2020-04-16'
delivery_guarantee: 'best_effort'
component_title: 'Change channel.'
description: 'This plugin allows you to change multiple channels name at different interval.'
instance: 'second-instance'
issues_url: https://github.com/dalexhd/SteamSpeak/issues?q=is%3Aopen+is%3Aissue
sidebar_label: 'Change Channel|second-instance'
source_url: https://github.com/dalexhd/SteamSpeak/blob/master/packages/server/src/core/TeamSpeak/plugins/second-instance/change_channel.ts
status: 'prod-ready'
title: 'Change Channel'
unsupported_operating_systems: []
---

This plugin allows you to change multiple channels name at different interval.

## Configuration

```typescript
export const info: UncommonPluginConfig = {
	name: 'Change channel',
	description: 'This plugin allows you to change multiple channels name at different interval.',
	config: {
		enabled: false,
		data: [
			{
				enabled: false,
				channelId: 118,
				changes: [
					{
						channelName: '[cspacer]Welcome',
						channelDescription: 'Welcome'
					},
					{
						channelName: '[cspacer]to',
						channelDescription: 'to'
					},
					{
						channelName: '[cspacer]SteamSpeak',
						channelDescription: 'SteamSpeak'
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
		]
	}
};

```
