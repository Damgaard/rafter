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
        "instances/designs/myEquiAzimuthDist_Segmentation",
        "cons/designs/segmentPositionings/EquiAzimuthDist"
    ],
    function (
        myOuterSurface,
        myEquiAzimuthDist_Segmentation,
        EquiAzimuthDist_positioning
        ) {

        var myEquiAzimuthDist_positioning, phiR_from_phiS, thetaR_from_thetaS;

        phiR_from_phiS = myEquiAzimuthDist_Segmentation.phiR_from_phiS;
        thetaR_from_thetaS = myEquiAzimuthDist_Segmentation.thetaR_from_thetaS;

        myEquiAzimuthDist_positioning = new EquiAzimuthDist_positioning(
            phiR_from_phiS,
            thetaR_from_thetaS,
            myOuterSurface
        );

        return myEquiAzimuthDist_positioning;
    }
);