#!/bin/bash
#
# start a binaural decoder from ambix toolbox as standalone 
# and patch it to a Ambisonics-Bus from PD eg. mixer3D3O
#
# if not installed by system, see https://github.com/kronihias/ambix
# 
cd $(dirname $0)
AMBIX_BINAURAL=$(which ambix_binaural_standalone_o5)

if [ "x${AMBIX_BINAURAL}" == "x" ]
then
    echo no ambix_binaural standalone application found
    echo .. see https://github.com/kronihias/ambix for installation
    exit 1
else
    echo found $AMBIX_BINAURAL
fi

$AMBIX_BINAURAL ../data/binaural/binaural_o5_setup.state
