#!/bin/sh
calldir=$(pwd)
cd $(dirname $0)

if [ -x ../../../libs/pd/bin/pd ]; then
	PD=../../../libs/pd/bin/pd
elif [ -x ../../../../libs/pd/bin/pd ]; then
	PD=../../../../libs/pd/bin/pd
else
	PD=pd
fi

echo using PD=$PD

# start pd with 18 channels out: 1,2= Stereo, 3-18 Ambisonics BUS, 19=SUB, 20=monitoring
$PD -jack -jackname Pd-mixer3D3O -inchannels 2 -outchannels 20  mixer3D3O.pd

cd $calldir
