==========
ACRE - amb
==========
------------------
Ambisonics Toolbox
------------------

:Author: Winfried Ritsch
:Contact: ritsch _at_ algo.mur.at, ritsch _at_ iem.at
:Copyright: winfried ritsch - IEM / algorythmics 2012+
:Version: 0.80a development
:git master repo: https://git.iem.at/pd/acre-amb



Ambisonics Toolbox is a collection of high level Pd abstraction, to implement Ambisonics functionality for Ambisonics mixer and processor, especially compositions and effects using ``iem-ambi'' external library.
One goal is to easily integrate Ambisonics encoder, decoder and processing for various purposes as modules providing dynamic multichannel operations and signaling enabling fast prototyping of Ambisonics algorithms.

This module extend the acre library with the base modules ``acre/acre``, ``acre/mxr`` and ``acre/ds``, which has to be installed.
It is based on the `iem_ambi` and some parts also on the `iem_bin_ambi` Pd-library, which is based on `iemmatrix` Pd-library.

Background
----------

In Ambisonics domain an 3D or 2D Ambisonics signal is a multichannel audio-signal.
With higher orders a better spatial resolution is provided and more Ambisonics channels are needed.
The channel count is calculated by the formulas ``n=(order+1)²`` for 3D and ``n=2*order+1`` for 2D. 
Therefore Ambisonics buses has to be implemented, which handle, for example on 5th order 3D 36 channels.
Until there is a snake functionality standard in Pd[snake]_ , we handle Ambisonics buses with abstraction and dynamic generated ``catch~/throw~`` and/or ``send~/receive~`` pairs to prevent excessive Pd cabling.
The order of the Ambisonics channels is important. 
Within 'amb' it complies with the ACN [ACN], N3D standard, which is used troughout the iem_ambi library.

Structure
---------

Buses
.....

Ambisonics buses have a name associated within an abstractions, which uses it. The chosen name ``<bus-id>`` also needs the order ``<order>`` and dimensions to be defined. An abstraction with lower order, but same dimensions, can be used to add to an Ambisonics bus with 'catch~'es and also to read from one with 'receive~'s, therefore a bus catches Ambisonics signals and sends.

Encoders and decoders
.....................

Encoders use Ambisonics Buses to throw their signals to them and decoders read from a Ambisonics bus and distribute it to speaker outs.


Outs
....

The outputs can be calibrated with Volume and delay and also host the master fader functionality.

Simple outs should only provide master fader.


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

- parts are from an implementation of the CUBEmixer from 2000+.

- since simple dynamic patching is used, r~/s~ and catch~/throw~ pairs can be created in a wrong order which drops an error warning on the console.
Since [savebang] is not implemented in Pd until now, we have to clear these abstractions before saving when developing to reduce warnings a little bit.
To prevent unnecessary warnings a little bit more, the initialization order is important, see example, using own initbang order.


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
 - recoder dsp, ctl ds

processing::

 - Binaural rendering
 - Headtracker support for binaural
 - 3D-Reverb
 - B-format encoder for various microphones from A-format

DONE
----
 
change names:
 - all signal objects with ~ at end like player, outs
 
 
additional docu
---------------

for an introduction see `acre/docu/`_  in the acre base module.
for more documentation explore docu_ here as `amb.rst`.

.. _docu: docu/

.. _`../docu/acre_intro.rst`: acre_acre.rst

References
----------

.. [snake] Pd-snake was an idea 2013 within a workshop with Miller Puckette at the IEM to extend Pd with multichannel signal connection, which is backwards compatible, but has not been implemented yet.

.. [ACN] The Ambisonics Association, “Ambisonic Channels,” checked: 2011-09-09.  [Online].  Available: http://ambisonics.ch/standards/channels/
