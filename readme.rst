==========
ACRE - amb
==========
------------------
Ambisonics Toolbox
------------------

:Author: Winfried Ritsch
:Contact: ritsch _at_ algo.mur.at, ritsch _at_ iem.at
:Copyright: winfried ritsch - IEM / algorythmics 2012+
:Version: 0.9
:git master repo: https://git.iem.at/pd/acre-amb

Ambisonics Toolbox is a collection of high level Pd abstraction, to implement Ambisonics functionality for Ambisonics mixing and processing, especially making compositions and effects using ``iem-ambi`` external library.
One goal is to easily integrate Ambisonics encoder, decoder and processing for various purposes as modules providing dynamic multichannel operations and signaling enabling fast prototyping of Ambisonics algorithms. So a main target is dynamic multichannel patching.

This module extend the acre library with the base modules ``acre/acre``, ``acre/mxr``, ``acre/ds`` and ``acre/rc``.
The Ambisonic functions using spherical harmonics are based on the `iem_ambi` library and some parts also on the `iem_bin_ambi` Pd-library using also`iemmatrix`, iemlib and zexy Pd-library, but trying to minimize dependencies.

Most and more actual documentation is in the abstractions in the libraries as comments.

Background
----------

In Ambisonics domain an 3D or 2D Ambisonics signal the signals can been seen as one multichannel audio-signal. 
Also multichannel buses should be treated as one bus signal.
Additionally, the channel count should be changeable during runtime.
With higher orders a better spatial resolution is provided and more Ambisonics channels are needed.
With more speakers, real or virtual signals are seen as multichannel signal.
The channel count is calculated by the formulas ``n=(order+1)²`` for 3D and ``n=2*order+1``.
Therefore Ambisonics buses and multichannel buses are implemented, which handle, for example on 5th order 3D 36 channels or 32 virtual speaker channels.
Until there is a snake functionality standard in Pd[snake]_ , we handle Ambisonics buses with abstraction and dynamic generated ``catch~/throw~`` and/or ``send~/receive~`` pairs to prevent excessive Pd cabling.
The alignments of the Ambisonics channels is important. 
Within the ambisonics functions it should comply with the ACN N3D standard [ACN], which is used throughout the iem_ambi library.
Multichannel buses with ``s~/r~`` and ``catch~/throw~`` could also be made with the new clone object, but clone cannot dynamically change the instance count at runtime.

Structure
---------

All objects as functions ``amb/<function>`` have, if they are control-able a corresponding ``amb/<function>_ctl`` or  ``amb/<function>_ctl~``, if signal processing is involved, and ``amb/<function>_ds`` data storage for settings in a preset module.
Function dedicated to Ambisonics signals have Dimension ``<3D|2D>`` and ``<order>`` as arguments for easier handling and common buses uses the channel count, but they can be mixed arbitrarily, so operations sometimes are only for buses can be used also for Ambisonics when the channel count is calculated by hand as shown above.

Buses
.....

Buses have a name associated within an abstractions, which uses it. The chosen name ``<bus-id>`` also needs the order ``<order>`` and dimensions ``<2D|3D>`` or channel count to be defined or can extend a BUS to higher order or more channels.
An abstraction with lower order, but same dimensions, can be used to be mixed in an Ambisonics bus by ``catch~`` and also to connect to the bus with ``receive~``, therefore a ``amb/bus/amb~`` or ``amb/bus/bus~`` catches Ambisonics signals and distributes them via ``send~``s.
On the other side a ``amb/bus/mix~`` can mix the signal to buses as also ``encoder/dsp~`` does.
``amb/bus/adcs~`` and ``amb/bus/dacs~`` are used to map audio inputs and outputs into Pd for bus operations.
Such operations like ``amb/bus/fade~``, ``amb/bus/mtx~`` and ``amb/bus/ops~`` can be used to set up an processing line.

Some, like ``amb/bus/outs~``, which combines calibration of outputs with individual delays, fader and mute and a master fader for calibration and better control are implemented.
Testones for an bus are implemented with ``amb/bus/tones~``, where the ordering of the channels can be heard by different tuned testtones, especially for testing the correct cabling of an Ambisonic system.


Encoders and decoders
.....................

Encoders use Ambisonics Buses to throw their signals to them and decoders read from a Ambisonics bus and distribute it to speaker outs, also managing the decoder matrix files.

Making Ambisonics decoder matrices and for calibration of the system some ``amb/tools`` are provided. (see documentation there).

Visualization
.............

For debugging visualization done by GUI objects with ``ctl`` postfix.
Additional a GUIs for control of the Ambisonics space the iemgui is used for better control of many channels, see ``amb/sphere``.

Another tool using the GEM library for rendering an Amisonics bus with Open-GL in different maps. A rough version started which is refactored from works done  on the IEM, see ``amb/tools/vi`` - to be cleaned and fixed again.

Binaural rendering
..................

of an Ambisonics signal is implemented by a really early version used within the CUBEmixer and will completed with the new version when the fast convolution engine object is ready to be included and Rendering presets from the Ambix library can be used.

Player
......

A Simple Ambisonics file player is implemented, waiting to be extended by conversion on the fly objects and support for the Ambix file format-


RRR
...

Room in Room Reverberation system is taken from the CUBEmixer and extended for also producing AVEs with Ambisoncs system using microphones in the rehearsal room, but can be used as a good Ambisoncs Reverb for other purposes.


Installation
------------

Needed libraries: acre_ base module, zexy, iemlib1, iemlib2, iemmatrix, iem_ambi, iem_bin_ambi
 libraries not installed in the system, can be copied to "libs/"
 (thus if checkout fresh it should be empty)

.. _acre: https://git.iem.at/pd/acre

acre-base module ``acre`` starting with version 2.0 should be installed in the Pd-search path.

Install this library in your search path naming this directory ``amb``. 
Do not set search path inside this library since objects are referred as amb/<object> in the patches and should not conflict
with other namespaces.

To install it: clone it via git, download it from somewhere or download/install it via `deken`.

Notes
-----

- parts are refactored from an implementation of the CUBEmixer from 2000+.

- Open/GL visualization using GEM was refactored from works by Matthias Kronlachner on the IEM.

- since simple dynamic patching is used, r~/s~ and catch~/throw~ pairs could be created in an order which drops an error/warning on the console on initialization.

- Since [savebang] is not implemented in Pd until now, we have to clear these abstractions before saving in case of changing abstractions to reduce some warnings a little bit.

- To prevent unnecessary warnings a little bit more, the initialization order is important, see example, using own initbang order in ``amb/amb/initbang``.

Todo
----

implementation

 - use clone for buses and others instead of dynamic patcher, which should clean the library.

ambisonics mixer::

 - Distance from 0..1 (has to be discussed)
 - distance signal objects with first reflection simulation
 - directional loudness
 - rotate, mirror
 - widening
 - virtual microphones
 - recorder dsp, ctl ds
 - renaming old objects from ``../dsp~`` to more descriptive names.

processing::

 - Extenting Binaural rendering 
 - Headtracker support for binaural
 - B-format encoder for various microphones from A-format

DONE
----
 
changes::

 - all signal objects with ~ at end like player, outs
 - 3D-Reverb

Additional docu
---------------

for an introduction see ``acre/docu/``  in the acre base module.
for more documentation explore docu_ here as `amb/readme.rst`.

.. _docu: docu/

.. _`../docu/acre_intro.rst`: acre_acre.rst

References
----------

.. [snake] Pd-snake was an idea 2013 within a workshop with Miller Puckette at the IEM to extend Pd with multichannel signal connection, which is backwards compatible, but has not been implemented yet.

.. [ACN] The Ambisonics Association, “Ambisonic Channels,” checked: 2011-09-09.  [Online].  Available: http://ambisonics.ch/standards/channels/
