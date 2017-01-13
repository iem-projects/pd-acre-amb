#!/bin/bash
#
# start a binaural decoder from ambix as standalone and patch it to 
# to a Ambisonics-Bus from PD eg. mixer3D3O
#
# if not installed by system, see https://github.com/kronihias/ambix
# 
cd $(dirname $0)

ambix_binaural_standalone_o5 ../data/binaural/binaural_o5_setup.state
