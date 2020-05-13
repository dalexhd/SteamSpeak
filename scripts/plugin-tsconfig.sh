#!/usr/bin/env bash

# plugin-tsconfig.sh
#
# SUMMARY
#
#   Generate a temp plugin ts configuration for compilation

set -eou pipefail

if [[ -z "${PLUGIN_PATH}" ]]; then
  echo "You must pass the plugin path as environment variable."
  exit 1
fi

TMP=packages/server/tsconfig-plugin.json
cat >$TMP <<EOF
{
  "compilerOptions": {
      "outDir": "dist",
      "allowJs": true,
      "target": "ES6",
      "module": "CommonJS",
      "moduleResolution": "node",
      "removeComments": true,
      "noEmitOnError": true,
      "baseUrl": "./",
      "sourceMap": false,
      "esModuleInterop": true,
      "allowSyntheticDefaultImports": true,
      "noUnusedLocals": true,
      "strictNullChecks": true,
      "paths": {
        "@config/*": ["src/config/*"],
        "@core/*": ["src/core/*"],
        "@locales/*": ["src/locales/*"],
        "@utils/*": ["src/utils/*"]
      },
      "typeRoots": ["ts3-nodejs-library"]
  },
  "include": [
    "./src/types/**/*",
EOF
echo "    \"${PLUGIN_PATH}\"" >> $TMP
cat >>$TMP <<EOF
  ],
  "exclude": [
    "./src/config/**/*",
    "./src/tests/**/*",
    "./src/core/Website/**/*",
    "./src/utils/**/*",
    "./src/core/Steam/**/*",
    "./src/core/TeamSpeak/*.ts",
    "./src/core/Cache/**/*",
    "./src/core/Database/**/*"
  ]
}
EOF
