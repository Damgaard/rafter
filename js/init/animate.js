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


define(
    [   "libs/three.js/build/three",
        "init/makeControls",
        "init/makeRenderer",
        "init/makeScene",
        "init/makeCamera"
    ],
    function (
        three,
        makeControls,
        makeRenderer,
        makeScene,
        makeCamera
        ) {

        //console.log("10");

        var controls;

        // render
        function render() {
            makeControls.controls.update();
            makeRenderer.renderer.render( makeScene.scene, makeCamera.camera );
        }

        // animate
        (function animate() {

            //requestAnimationFrame( animate );
            //render();

            setTimeout( function() {
                requestAnimationFrame( animate );
            }, 1000 / 10 );

            render();

        }());

        return {};
    }
);