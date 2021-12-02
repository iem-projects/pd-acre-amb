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

Ambisonics Toolbox is a collection of high level Pd abstraction, to implement Ambisonics functionality for mixing and processing multichannel Ambisonics signals, especially making compositions and effects using ``iem-ambi`` external library.
One goal is to easily integrate Ambisonics encoder, decoder and processing for various purposes as modules providing dynamic multichannel operations, to allow fast prototyping of Ambisonics algorithms. 
Therefore the main benefit is easier multichannel patching.

This module extend the acre library with the base modules ``acre/acre``, ``acre/mxr``, ``acre/ds`` and ``acre/rc``.
The Ambisonics functions using spherical harmonics are based on the `iem_ambi` library and some parts also on the `iem_bin_ambi` Pd-library using also`iemmatrix`, iemlib and zexy Pd-library, but trying to minimize dependencies.

Most and more actual documentation is in the abstractions in the libraries as comments.

Background
----------

In the Ambisonics domain, the signals forming the 2D or 3D Ambisonics bus can been seen as one multichannel audio-signal. 
Also multichannel buses should be treated as one bus signal.
Additionally, the channel count should be changeable during runtime.
With higher orders a better spatial resolution is provided and more Ambisonics channels are needed.
With more speakers, real or virtual signals are seen as multichannel signal.
The channel count is calculated by the formulas ``n=(order+1)²`` for 3D and ``n=2*order+1``.
Therefore Ambisonics buses and multichannel buses are implemented, which handle, for example on 5th order 3D 36 channels or 32 virtual speaker channels.
Until there is a snake functionality standard in Pd[snake]_ , we handle Ambisonics buses with abstraction and dynamic generated ``catch~/throw~`` and/or ``send~/receive~`` pairs to prevent excessive Pd cabling.
The alignments of the Ambisonics channels is important. 

Lately the Ambisonics functions, like used in "iem_plugins" [iem_plugins] should comply with the ACN SN3D standard [ACN], which is not used in the "iem_ambi" library, SID is used there historically. 
If you want to share with an ACN system you have to take care of proper encoder settings and decoder matrices.

Multichannel buses with ``s~/r~`` and ``catch~/throw~`` could also be made with the new clone object, but clone cannot dynamically change the instance count at runtime.

Structure
---------

All objects as functions ``amb/<function>`` have, if they are control-able a corresponding ``amb/<function>_ctl`` or  ``amb/<function>_ctl~``, if signal processing is involved, and ``amb/<function>_ds`` and ``amb/<function>_rc`` for data storage in a presets and remote control module 
Functions dedicated to Ambisonics signals have Dimension ``<3D|2D>`` and ``<order>`` as arguments for consistent handling of the needed channel count. Some functions take channel count directly and can be mixed arbitrarily.
Some operations are for arbitrary buses can be used also for Ambisonics when the channel count is calculated by hand as shown above.

Buses
.....

Buses have a name associated within an abstractions, which uses it. The chosen name ``<bus-id>`` also needs the order ``<order>`` and dimensions ``<2D|3D>`` or channel count to be defined or can extend a BUS to higher order or more channels.
An abstraction with lower order, but same dimensions, can be used to be mixed in an Ambisonics bus by ``catch~`` and also to connect to the bus with ``receive~``, therefore a ``amb/bus/amb~`` or ``amb/bus/bus~`` catches Ambisonics signals and distributes them via ``send~``s.
On the other side a ``amb/bus/mix~`` can mix the signal to buses as also ``encoder/dsp~`` does.
``amb/bus/adcs~`` and ``amb/bus/dacs~`` are used to map audio inputs and outputs into Pd for bus operations.
Such operations like ``amb/bus/fade~``, ``amb/bus/mtx~`` and ``amb/bus/ops~`` can be used to set up an processing line.

Some, like ``amb/bus/outs~``, which combines calibration of outputs with individual delays, fader and mute and a master fader for calibration and better control are implemented.
Testones for an bus are implemented with ``amb/bus/tones~``, where the ordering of the channels can be heard by different tuned testtones, especially for testing the correct cabling of an Ambisonic system.

Note: order of ambisonics signal does not matter on most objects, except decoders and encoders

Encoders and decoders
.....................

Encoders use Ambisonics Buses to throw their signals to them and decoders read from a Ambisonics bus and distribute it to speaker outs, also managing the decoder matrix files.

Making Ambisonics decoder matrices and for calibration of the system some ``amb/tools`` are provided. (see documentation there).

Note: the channel order on iem_ambi is historical SID and new versions especially if plugins are used use ACN, so the signal order can be changed on encoder !!!

Visualization
.............

For debugging visualization done by GUI objects with ``ctl`` postfix.
Additional a GUIs for control of the Ambisonics space the iemgui is used for better control of many channels, see ``amb/sphere``.

Another tool using the GEM library for rendering an Amisonics bus with Open-GL in different maps. A rough version started which is refactored from works done  on the IEM, see ``amb/tools/vi`` - to be cleaned and fixed again.

Binaural rendering
..................

of an Ambisonics binaural renderer was implemented decades ago as an early version, which needs lots of computation und was used within the CUBEmixer.
A newer faster version will be implemented, when the fast convolution engine object is ready to be included and Rendering presets from the Ambix library can be used.

In the meantime either use a plugin with "vst_plugin" external [vst_plugin] or a simplified stereo rendering with a simple decoder and some filter, see "amb/bin" for latest implementations

Player
......

A Simple Ambisonics file player is implemented, waiting to be extended by conversion on the fly objects and support for the Ambix file format-

RRR
...

Room in Room Reverberation system is taken from the CUBEmixer and extended for also producing AVEs with Ambisonics system using microphones in the rehearsal room, but can be used as a good Ambisonics Reverb for other purposes. It needs six inputs and generates an ambisonics 3rd order reverb.


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

.. [ACN] wikipedia: Ambisonic data exchange formats 2021-09-09.  [Online].  https://en.wikipedia.org/w/index.php?title=Ambisonic_data_exchange_formats&oldid=1032749164

.. [iem_plugins] http://plugins.iem.at/

.. [vst_plugin] https://git.iem.at/pd/vstplugin
