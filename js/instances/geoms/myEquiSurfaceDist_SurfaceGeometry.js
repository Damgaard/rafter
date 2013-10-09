/**
 * This file is part of Rafter.
 *
 * Rafter is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Rafter is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero Public License for more details.
 *
 * You should have received a copy of the GNU Affero Public License
 * along with Rafter. If not, see <https://www.gnu.org/licenses/agpl.html>.
 *
 * @copyright Jon Loldrup     loldrup@gmail.com
 * @copyright Hjalte Loldrup  hjalteloldrup@gmail.com
 *
 */

"use strict";


define(
    [   "libs/three.js/build/three",
        "instances/designs/myRafterwiseSegmentation",
        "specs/geoms/myEquiSurfaceDist_SurfaceGeometrySpec",
        "cons/geoms/Surface"
    ],
    function (
        three,
        myRafterwiseSegmentation,
        myEquiSurfaceDist_SurfaceGeometrySpec,
        SurfaceGeometry
        ) {

        //console.log("42");

        var myEquiSurfaceDist_SurfaceGeometry;

        myEquiSurfaceDist_SurfaceGeometry = new THREE.SurfaceGeometry(
            myRafterwiseSegmentation.noOfSegments_along_azimuth,
            myRafterwiseSegmentation.noOfSegments_along_polar,
            myRafterwiseSegmentation.getXSES,
            myRafterwiseSegmentation.getYSES,
            myRafterwiseSegmentation.getZSES,
            myEquiSurfaceDist_SurfaceGeometrySpec);

        return myEquiSurfaceDist_SurfaceGeometry;
    }
);