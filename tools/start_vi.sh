#!/bin/sh
calldir=$(pwd)
cd $(dirname $0)

# start with 5th order input: 16 channels and in no realtime
pd -nrt -jack -jackname Pd-ambi_vi  -nodac -inchannels 16 vi.pd 
