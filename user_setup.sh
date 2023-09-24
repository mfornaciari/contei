#!/usr/bin/env bash

if (( addgroup --system --gid $USER dockergroup 2> &1 | grep 'already in use' ))
then
  true
fi

if (( adduser --system --gid $USER dockeruser 2> &1 | grep 'already in use' ))
then
  true
fi
