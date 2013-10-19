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
        "instances/designs/myEquiSurfaceDist_Segmentation",
        "instances/designs/segmentPositionings/myEquiSegmentDist",
        "specs/geoms/myEquiSegmentDist_SurfaceGeometrySpec",
        "cons/geoms/Surface"


    ],
    function (
        three,
        myEquiAzimuthDist_Segmentation,  // fails when replaced with myEquiSegmentDist_Segmentation
        myEquiSegmentDist_segmentPositioning,
        myEquiSegmentDist_SurfaceGeometrySpec,
        SurfaceGeometry  // don't use any variables explicitly exported from this one, here.
        ) {

        //console.log("42");

        var myEquiSegmentDist_SurfaceGeometry;

        myEquiSegmentDist_SurfaceGeometry = new THREE.SurfaceGeometry(
            myEquiAzimuthDist_Segmentation.noOfSegments_along_azimuth,
            myEquiAzimuthDist_Segmentation.noOfSegments_along_polar,
            myEquiSegmentDist_segmentPositioning.getXSESe,
            myEquiSegmentDist_segmentPositioning.getYSESe,
            myEquiSegmentDist_segmentPositioning.getZSESe,
            myEquiSegmentDist_SurfaceGeometrySpec
        );

        return myEquiSegmentDist_SurfaceGeometry;
    }
);