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
        "instances/designs/myEquiAzimuthDist_Segmentation",
        "specs/geoms/myEquiAzimuthDist_SurfaceGeometrySpec",
        "cons/geoms/Surface"
    ],
    function (
        three,
        myEquiAzimuthDist_Segmentation,
        myEquiAzimuthDist_SurfaceGeometrySpec,
        SurfaceGeometry
        ) {

        //console.log("42");

        var myEquiAzimuthDist_SurfaceGeometry;

        myEquiAzimuthDist_SurfaceGeometry = new THREE.SurfaceGeometry(
            myEquiAzimuthDist_Segmentation.noOfSegments_along_azimuth,
            myEquiAzimuthDist_Segmentation.noOfSegments_along_polar,
            myEquiAzimuthDist_Segmentation.getXSEA,
            myEquiAzimuthDist_Segmentation.getYSEA,
            myEquiAzimuthDist_Segmentation.getZSEA,
            myEquiAzimuthDist_SurfaceGeometrySpec
        );

        return myEquiAzimuthDist_SurfaceGeometry;
    }
);