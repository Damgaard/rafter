/**
 * @copyright Jon Loldrup loldrup@gmail.com
 * @copyright Hjalte Loldrup hjalteloldrup@gmail.com

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
        "init/makeMeshes",
        "init/makeCamera"
    ],
    function (
        three,
        makeMeshes,
        makeCamera
    ) {

        //console.log("16");

    var projector;

// projector
    projector = new THREE.Projector();

// listeners
    document.addEventListener( 'mousedown', onDocumentMouseDown, false)

// mouse handler
    function onDocumentMouseDown( event ) {

        event.preventDefault();

        var vector = new THREE.Vector3(
            ( event.clientX / window.innerWidth ) * 2 - 1,
            - ( event.clientY / window.innerHeight ) * 2 + 1,
            0.5 );

        projector.unprojectVector( vector, makeCamera.camera );

        var ray = new THREE.Ray( makeCamera.camera.position, vector.subSelf( makeCamera.camera.position ).normalize() );

        var intersects = ray.intersectObjects( makeMeshes.objects );

        if ( intersects.length > 0 ) {

            intersects[0].object.callback();

        }

    };

    return {};

});