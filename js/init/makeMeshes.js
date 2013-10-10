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
        "init/makeScene",
        "init/makeDOMelements",
        "cons/geoms/Surface",
        "cons/designs/Segmentation",
        "instances/designs/myGeometrywiseSegmentation",
        "instances/designs/myRafterwiseSegmentation",
        "instances/designs/myWinDoorSet",
        "instances/geoms/myEquiAzimuthDist_SurfaceGeometry",
        "instances/geoms/myEquiSurfaceDist_SurfaceGeometry",
        "specs/geoms/myEquiSurfaceDist_SurfaceGeometrySpec"
    ],
    function (
        three,
        makeScene,
        makeDOMelements,
        SurfaceGeometry,  // don't use any variables explicitly exported from this one, here.
        Segmentation,
        myGeometrywiseSegmentation,
        myRafterwiseSegmentation,
        myWinDoorSet,
        myEquiAzimuthDist_SurfaceGeometry,
        myEquiSurfaceDist_SurfaceGeometry,
        myEquiSurfaceDist_SurfaceGeometrySpec
    ) {

        //console.log("15");

        var myEquiAzimuthDist_SurfaceGeometry
          , myEquiSurfaceDist_SurfaceGeometry
          , meshA
          , meshB
          , objects = [];
//console.log("myGeometrywiseSegmentation.noOfSegments_along_azimuth: ", myGeometrywiseSegmentation.noOfSegments_along_azimuth);

        meshA = new THREE.Mesh(myEquiAzimuthDist_SurfaceGeometry);
        meshA.position.set( 0, 0, 0 );
        meshA.name = "myWallA";
        meshA.callback = function() { makeDOMelements.info.innerHTML = this.name; };
        //makeScene.scene.add( meshA );
        objects.push( meshA );

        meshB = new THREE.Mesh(myEquiSurfaceDist_SurfaceGeometry);
        meshB.position.set( 0, 0, 0 );
        meshB.name = "myWallB";
        meshB.callback = function() { makeDOMelements.info.innerHTML = this.name; };
        makeScene.scene.add( meshB );
        objects.push( meshB );

        return {
            objects: objects
        }
    }
);