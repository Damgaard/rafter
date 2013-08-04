/**
 * @copyright Jon Loldrup loldrup@gmail.com
 * @copyright other-contributors-name-here

 This file is part of Rafter.

 Rafter is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Rafter is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero Public License for more details.

 You should have received a copy of the GNU Affero Public License
 along with Rafter. If not, see <https://www.gnu.org/licenses/agpl.html>.
 */

"use strict";


// CONFIGURE require.js BEFORE LOADING MODULES:

requirejs.config({
    paths: {
        'Three': 'libs/three.js/build/three'
    },
    shim: {
        'libs/three.js/build/three': {
            deps: [],
            exports: 'three'//'three' will not be accessible, but any values that
                             // three.js writes to the global object will become
                             // available to me if I import 'three'.
            /*init: function () {
                // if I want 'three' to actually refer to something, I can do so
                by returning whatever I want it to refer to, in this init function
                console.log("init three. Is THREE available? ", THREE);
                return this;
            }*/
        },
        'libs/three.js/examples/js/controls/OrbitControls': {
            deps: ['libs/three.js/build/three'],
            exports: 'orbitcontrols'
        }
    }
});

// NOW START LOADING MODULES:

require(
    [   "init/makeMouseHandler",
        "init/animate",
        "init/makeLight"
    ],
    function main (   // this function is, by all means of the word, the main function.
                      // Due to their shimmy nature 'three' and 'orbitcontrols'
        makeMouseHandler, // can't actually be accessed (but their content can).
        animate,
        makeLight
        ) {

        //console.log("31");
        //console.log("running main. regards, main");
    }
);