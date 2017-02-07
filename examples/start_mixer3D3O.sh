#!/bin/sh
calldir=$(pwd)
cd $(dirname $0)


# start pd with 18 channels out: 1,2= Stereo, 3-18 Ambisonics BUS, 19=SUB, 20=monitoring
pd -jack -jackname Pd-mixer3D3O -inchannels 2 -outchannels 20  mixer3D3O.pd

cd $calldir
