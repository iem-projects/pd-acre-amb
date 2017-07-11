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

# 18 channels in: 1,2 stereo in, 3-18 Ambisonics In see patch
INCHANNELS=18
# 20 channels out: 1,2= Stereo, 3-18 Ambisonics BUS, 19=SUB, 20=monitoring
OUTCHANNELS=20


$PD -jack -jackname Pd-mixer3D3O -inchannels $INCHANNELS -outchannels $OUTCHANNELS  mixer3D3O.pd

if [ $? -ne 0 ]; then
	echo try without jackname
	$PD -jack -inchannels $INCHANNELS -outchannels $OUTCHANNELS  mixer3D3O.pd
fi


cd $calldir
