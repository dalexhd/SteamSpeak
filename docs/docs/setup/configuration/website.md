---
id: website
title: Website configuration
---

To be able to customize SteamSpeak web panel, you will need to edit and replace some files into de `packages/client` folder.

import Tabs from '@theme/Tabs';
import Field from '@site/src/components/Field';
import Fields from '@site/src/components/Fields';
import Alert from '@site/src/components/Alert';
import Steps from '@site/src/components/Steps';

## Folder structure

```
📦client
 ┣ 📂dist
 ┣ 📂public
 ┣ 📂src
 ┣ 📂tests
 ┣ 📜.editorconfig
 ┣ 📜.eslintrc.js
 ┣ 📜.firebaserc
 ┣ 📜.gitignore
 ┣ 📜auth_config.json
 ┣ 📜babel.config.js
 ┣ 📜firebase.json
 ┣ 📜package.json
 ┣ 📜tailwind.config.js
 ┣ 📜themeConfig.js
 ┗ 📜vue.config.js
 ```

## Edit files

<Steps headingDepth={3}>

1.  ### vue.config.js

This file contains most of the website related configuration. After editing this file, you will need to rebuild you website.

<Tabs
  block
  className="rounded"
  values={[
    { label: `chainWebpack`, value: 'chainWebpack', class: '' },
    { label: 'transpileDependencies', value: 'transpileDependencies' },
    { label: 'pwa', value: 'pwa' },
    { label: 'devServer', value: 'devServer' },
    { label: 'css', value: 'css' }
  ]}
>
<TabItem value="chainWebpack">

```js
chainWebpack: (config) => {
  config.plugin('html').tap((args) => {
    args[0].title = 'SteamSpeak';
    return args;
  });
  config.plugin('define').tap((args) => {
    args[0]['process.env'].VERSION = JSON.stringify(_package.version);
    return args;
  });
}
```

<Fields filters={true}>
<Field
  defaultValue={"SteamSpeak"}
  enumValues={null}
  examples={["My custom website"]}
  groups={[]}
  name={"args[0].title"}
  path={null}
  relevantWhen={null}
  required={true}
  templateable={false}
  type={"string"}
  unit={null}
  warnings={[]}
  >

#### args[0].title

Change it to define your custom website title.
</Field>

<Field
  enumValues={null}
  examples={["v0.4.0"]}
  groups={[]}
  name={"args[0]['process.env'].VERSION"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"string"}
  unit={null}
  warnings={[{text: "You shouldn't edit this part."}]}
  >

#### args[0]['process.env'].VERSION
Used to set your current website version.
</Field>

</Fields>

</TabItem>
<TabItem value="transpileDependencies">

<Alert type="warning">
You should't edit this.
</Alert>

</TabItem>

<TabItem value="pwa">
One important feature, it's that you can download the "panel" as an Android/iOS application.

```js
pwa: {
  name: 'SteamSpeak',
  themeColor: '#448aff',
  msTileColor: '#da532c',
  appleMobileWebAppCapable: 'yes',
  appleMobileWebAppStatusBarStyle: 'black',
  gcm_sender_id: '1021489007211',
  manifestOptions: {
    background_color: '#448aff'
  },
  // configure the workbox plugin
  workboxPluginMode: 'InjectManifest',
  workboxOptions: {
    swSrc: 'src/service-worker.js'
  }
}
```
<Fields filters={true}>
<Field
  defaultValue={"SteamSpeak"}
  enumValues={null}
  examples={["My custom website"]}
  groups={[]}
  name={"name"}
  path={null}
  relevantWhen={null}
  required={true}
  templateable={false}
  type={"string"}
  unit={null}
  warnings={[]}
  >

#### name
Change it to define your custom your custom "application" name.
</Field>
<Field
  defaultValue={"448aff"}
  enumValues={null}
  examples={["2196F3"]}
  groups={[]}
  name={"themeColor"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"string"}
  unit={null}
  warnings={[]}
  >

#### themeColor
Editing this value will have the effect of applying the color automatically to every page the user visits on your domain when the site is launched from the home screen.
![example](https://developers.google.com/web/updates/images/2015-08-29-using-manifest-to-set-sitewide-theme-color/theme-color.png)
</Field>
<Field
  defaultValue={"yes"}
  enumValues={null}
  examples={["yes", "no"]}
  groups={[]}
  name={"appleMobileWebAppCapable"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"string"}
  unit={null}
  warnings={[]}
  >

#### appleMobileWebAppCapable
If content is set to yes, the web application runs in full-screen mode; otherwise, it does not.
</Field>
<Field
  defaultValue={"black"}
  enumValues={null}
  examples={["default", "black", "black-translucent"]}
  groups={[]}
  name={"appleMobileWebAppStatusBarStyle"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"string"}
  unit={null}
  warnings={[]}
  >

#### appleMobileWebAppStatusBarStyle
In order to change the iOS status bar of your progressive web app, you must use the apple-mobile-web-app-status-bar-style meta tag.
![example](https://i.imgur.com/sux5vTk.png)
</Field>
<Field
  defaultValue={"448aff"}
  enumValues={null}
  examples={["2196F3"]}
  groups={[]}
  name={"manifestOptions.background_color"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"string"}
  unit={null}
  warnings={[]}
  >

#### manifestOptions.background_color
The background color will affect the background color of the splash screen, when a user first opens your app.
</Field>
<Field
  enumValues={null}
  examples={["GenerateSW", "InjectManifest"]}
  groups={[]}
  name={"workboxPluginMode"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"string"}
  unit={null}
  warnings={[{text: "You shouldn't edit this part."}]}
  >

#### workboxPluginMode
This allows you to the choose between the two modes supported by the underlying workbox-webpack-plugin.
</Field>
<Field
  enumValues={null}
  examples={["GenerateSW", "InjectManifest"]}
  groups={[]}
  name={"workboxOptions.swSrc"}
  path={null}
  relevantWhen={null}
  required={true}
  type={"string"}
  unit={null}
  warnings={[{text: "You shouldn't edit this part."}]}
  >

#### workboxOptions.swSrc
These options are passed on through to the underlying workbox-webpack-plugin.
For more information on what values are supported, please see the guide for <a href="https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_generatesw_config" target="_blank" rel="noopener noreferrer">GenerateSW</a> or for <a href="https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_generatesw_config" target="_blank" rel="noopener noreferrer">InjectManifest</a>.

</Field>
</Fields>
</TabItem>
<TabItem value="devServer">
<Alert type="warning">
You should't edit this.
</Alert>
</TabItem>
<TabItem value="css">
<Alert type="warning">
You should't edit this.
</Alert>
</TabItem>
</Tabs>
</Steps>
