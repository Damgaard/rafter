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
    [ "specs/designs/myEquiAzimuthDist_SegmentationSpec"
    ],
    function (
        myEquiAzimuthDist_SegmentationSpec
        ) {

        //console.log("28");

        var myEquiSurfaceDist_SegmentationSpec;

        myEquiSurfaceDist_SegmentationSpec = {
            max_outer_segmentExtent_along_polar: myEquiAzimuthDist_SegmentationSpec.max_outer_segmentExtent_along_polar * 20,
            max_outer_segmentExtent_along_azimuth:  myEquiAzimuthDist_SegmentationSpec.max_outer_segmentExtent_along_azimuth * 5,
            conf: {
                maxRecursionDepth: 6,
                debug: false
            }
        };

        Object.freeze(myEquiSurfaceDist_SegmentationSpec);
        return myEquiSurfaceDist_SegmentationSpec;
    }
);