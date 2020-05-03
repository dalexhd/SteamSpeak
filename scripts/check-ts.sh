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
SERVER_FOLDER='packages/server';
CACHE_FILE='packages/server/.tsbuildinfo';
SUM_FILE='packages/server/.tsbuildsum';

#
# Exports
#
export LC_ALL=C;

#
# Functions
#
runIncremental() {
  echo "Building the Server Application..."
  ( cd $SERVER_FOLDER && yarn run build )
  PARAMS="-not -samefile $SUM_FILE -not -samefile $CACHE_FILE -not -path \"$SERVER_FOLDER/node_modules\" ! -path \"$SERVER_FOLDER/dist\""
  FOLDER_SUM="$({
    find $SERVER_FOLDER -type f $PARAMS -exec md5sum {} + | sort | md5sum;
  } | md5sum)"
  echo "$FOLDER_SUM" > $SUM_FILE
}

#
# Requirements
#
if [ -f "$CACHE_FILE" ]; then
  echo "Cache file found: $CACHE_FILE"

  PARAMS="-not -samefile $SUM_FILE -not -samefile $CACHE_FILE -not -path \"$SERVER_FOLDER/node_modules\" ! -path \"$SERVER_FOLDER/dist\""
  FOLDER_SUM="$({
    find $SERVER_FOLDER -type f $PARAMS -exec md5sum {} + | sort | md5sum;
  } | md5sum)"

  if [ -f "$SUM_FILE" ]; then touch $SUM_FILE; fi
  CACHED_SUM=$(< $SUM_FILE)

  if [ "$FOLDER_SUM" != "$CACHED_SUM" ]; then
    runIncremental
  else
    echo "Sum has not changed."
  fi
else
  echo "$CACHE_FILE Doesn't exist";
  runIncremental
fi

