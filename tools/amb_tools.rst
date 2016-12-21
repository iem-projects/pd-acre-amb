Ambisonics Tools
================

:author: winfried ritsch, iem 2015+

Collection of standalone applications for supporting to set up of an Ambisonics system.

This tools have to be adapted for the actual setup and therefore should be seen as examples and a starting point.
Copy them in your project and modify them.


A) Calibrator
-------------

To calibrate a speaker setup with delays and levels using an appropriate microphone.
This is preferable a omni directional condensor microphone put in the middle of
the sweet spot. 
Also more microphones can be used, calibrated to each other and mixed to one channel, positioned in the sweet-spot area.

Workflow
........

0.) Enter number of speaker and assign DAC in dac objects

1.) choose the right ADC channel and level the input to about -10dB at loudest.

2.) optional compensate latency of system:
    measure with microphone at one speaker (reduce volume !) and measure latency 
    or enter the minimum expected latency (eg. audio buffer size of the audio card).

3.) microphone in the middle of the sweet spot. 

4.) place yourself NOT near the microphone

5.) test if all speaker are working with lower volume.

6.) raise volume and start automatic measurement (use ear protectors if needed !!!)

7.) store results


Hints
.....

Microphone position
 The microphone should be out of the reverberation radius of the speaker::

  Rr ~ 0.057 * sqrt(V/T60)

  T60(T30,T20) ... reverberation time for -60dB,-30dB,-20dB measurement method
  V ... room volume

latency 
 of computer should be measured first, but since only relative delay values are used, absolute value is not really important.

B) Simple Decoder Matrix calculator
-----------------------------------

Note: Not working properly at the moment for complex setups, please use allrad.

The decoder matrix calculator is taken from the CUBEmixer and iemambi library.
For better decoder matrixes use tools provided by other sources like Ambisonics Decoder Toolbox [ADT] by Aaron J. Heller 
( https://bitbucket.org/ambidecodertoolbox/adt.git )

Workflow
........

see patch

Hints
.....
 The inverse of the speaker matrix is calculated, but this can be singular. Especially for hemisphere arrangement of speakers, use phantom speakers to fill the sphere.

References
----------

.. [ADT] Ambisonics Decoder Toolbox paper LAC: http://lac.linuxaudio.org/2014/papers/17.pdf

.. [iem_ambi] https://git.iem.at/pd/iem_ambi