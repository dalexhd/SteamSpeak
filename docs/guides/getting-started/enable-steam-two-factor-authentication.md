---
last_modified_on: "2020-03-27"
$schema: "/.meta/.schemas/guides.json"
title: How to enable two factor authentication
description: In this tutorial you’ll enable two factor authentication
author_github: https://github.com/SteamTimeIdler
tags: ["type: guide", "service: Steam", "domain: operations"]
---

import Assumptions from '@site/src/components/Assumptions';
import Alert from '@site/src/components/Alert';

<Assumptions name="guide">

* You understand what [SteamSpeak][docs.about.concepts] does.

</Assumptions>

## Getting Shared Secret from Android (Windows)

When you install the Steam Mobile App on an Android device, you are required to use it to generate your SteamGuard codes. For us to automate this with AutoRestarter without using your phone every time, you need to get the Shared Secret from your phone.

You can only do this with a rooted Android. (Valve recently patched the un-rooted method):

If you have a rooted android phone, you can simply browse to the files you need using Root Explorer and copy the file you need and get it to your desktop using Dropbox or similar.

The file you will need is:

`/data/data/com.valvesoftware.android.steam.community/f/Steamguard-STEAMID64`

If you don't have a rooted phone, you will not be able to access the /data folder, even if you install Root Explorer.

### Inside of the file you will find the code.

If you are unsure how to get the code, then add: https://steamcommunity.com/id/tirone/ or [request a steam add](https://steamtimeidler.com/support/request-a-steam-friend-invite/) to have it picked out for you :)

## Getting Shared Secret from iOS (Windows)

When you install the Steam Mobile App on an iPhone, you are required to use it to generate your SteamGuard codes. For us to automate this with AutoRestarter without using your phone every time, you need to get the Shared Secret from your phone.

To get your shared secret from your iOS device, you will first need to make a backup of your device in iTunes. (NOTE: iTunes should be downloaded through the Apple website and not over the Windows store.)

To browse your backup, you need to install iExplorer.

https://macroplant.com/iexplorer

Install and run iExplorer. Hit to use demo mode, and then at the bottom hit to browse backups.

At the top right, you can type Steam in the search to make things faster.

You want to find the folder:

`AppDomain-com.valvesoftware.Steam`

Then browse to:

`\Documents\Steamguard-STEAMID64`

This is the file you want. Right click it and click **"View in Explorer"** NOT "Export to Folder".

Now open the file with Notepad++. The format is a little weird - your shared_secret is inside. If you are unsure how to get the code, then add: https://steamcommunity.com/id/tirone/ or [request a steam add](https://steamtimeidler.com/support/request-a-steam-friend-invite/) to have it picked out for you :)

<Alert type="info" closable="true">

There may be weird characters in the text file and it may look all strange, but you've probably got the right file. It's just extracting the correct bit of text

</Alert>

<Alert type="info" closable="true">

The Generated Auth Code on SteamTimeIdler should match the auth code on your phone. That's how you know if it's worked or not!

</Alert>

## Getting Shared Secret from Steam Desktop Authenticator (Windows)

If you can't do the above options there's always Steam Desktop Authenticator:
https://github.com/Jessecar96/SteamDesktopAuthenticator

To get the shared_secret, open your SteamDesktopAuth folder and open 'maFiles'

Open the file with your steamID in Notepad and your code will be inside.

### Inside of the file you will find a few entries you will need:

`"shared_secret":"#############################",`

NOTE: The Generated Auth Code on SteamTimeIdler should match the auth code on your desktop app. That's how you know if it's worked or not!

If you are unsure how to get the code, then add: https://steamcommunity.com/id/tirone/ or [request a steam add](https://steamtimeidler.com/support/request-a-steam-friend-invite/) to have it picked out for you :)

---

![Shared_secret](https://i.imgur.com/nKz5mSc.png)

[docs.about.concepts]: /docs/about/what-is-steamspeak/
