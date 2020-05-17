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
PACKAGES=("build-essential")

#
# Exports
#
export LC_ALL=C;

#
# Functions
#
install_packages()
{
    ## Prompt the user
    read -p "Do you want to install missing libraries? [Y/n]: " answer
    ## Set the default value if no answer was given
    answer=${answer:-Y}
    ## If the answer matches y or Y, install
    [[ $answer =~ [Yy] ]] && sudo apt-get install ${PACKAGES[@]}
}

#
# Requirements
#
if [ ! -d "$OLDCONFIG_FOLDER" ]; then
  while true; do
      read -p "UPS... It seems that you didn't run make config command. Run it now? (y/n): " yn
      case $yn in
          [Yy]* )
            dpkg -s "${PACKAGES[@]}" >/dev/null 2>&1 || install_packages
            make config && exit;;
          [Nn]* )
            exit 1;;
          * )
            echo "Please answer yes or no.";;
      esac
  done
else
  echo "$OLDCONFIG_FOLDER Exists...";
fi
