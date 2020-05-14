#!/usr/bin/env bash

# check-ts.sh
#
# SUMMARY
#
#   Checks the sum of the server directory and
#   if it's different from previus launch, it
#   recompiles typescript incrementally.

set -eou pipefail

#
# Variables
#
OLDCONFIG_FOLDER='packages/server/src/config/old.config';

#
# Exports
#
export LC_ALL=C;

#
# Requirements
#
if [ ! -d "$OLDCONFIG_FOLDER" ]; then
  while true; do
      read -p "UPS... It seems that you didn't run make config command. Run it now? (y/n): " yn
      case $yn in
          [Yy]* ) make config && exit;;
          [Nn]* ) exit 1;;
          * ) echo "Please answer yes or no.";;
      esac
  done
else
  echo "$OLDCONFIG_FOLDER Exists...";
fi
