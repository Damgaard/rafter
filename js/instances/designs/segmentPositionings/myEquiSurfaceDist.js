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
    [   "instances/designs/myOuterSurface",
        "instances/designs/myEquiSurfaceDist_Segmentation",
        "instances/designs/myDelimitation",
        "cons/designs/segmentPositionings/EquiSurfaceDist",
        "specs/designs/segmentPositionings/myEquiSurfaceDistSpec"
    ],
    function (
        myOuterSurface,
        myEquiSurfaceDist_Segmentation,
        myDelimitation,
        EquiSurfaceDist_segmentPositioning,
        myEquiSurfaceDist_segmentPositioningSpec
        ) {

        var myEquiSurfaceDist_segmentPositioning,
            thetaR_from_thetaS,
            segment_extent_azimuth;

        thetaR_from_thetaS = myEquiSurfaceDist_Segmentation.thetaR_from_thetaS;
        segment_extent_azimuth = myEquiSurfaceDist_Segmentation.segment_extent_azimuth;

//        EquiAzimuthDist_Segmentation = function (
//            aEquiSurfaceDist_segmentPositioningSpec, aDelimitation,
//            thetaR_from_thetaS, aSurface )

        myEquiSurfaceDist_segmentPositioning = new EquiSurfaceDist_segmentPositioning(
            myEquiSurfaceDist_segmentPositioningSpec,
            myDelimitation,
            thetaR_from_thetaS,
            segment_extent_azimuth,
            myOuterSurface
        );

        return myEquiSurfaceDist_segmentPositioning;
    }
);