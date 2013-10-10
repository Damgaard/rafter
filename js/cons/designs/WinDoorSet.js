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


//This constructor is not in use anywhere yet


define(
    [ "libs/three.js/build/three",
      "cons/designs/TangentPlane"],
    function (
        three,
        TangentPlane
        ) {
        //console.log("999");

        var WinDoorSet;

        WinDoorSet = function ( aWinDoorSetSpec, aSurface, aDelimitation ) {
            var winDoorNo,
                winDoor_center_tangentPlane,
                thetaR_tangentV,
                winDoor_polar_posStart_in_radians,
                halfWidthCM,
                halfWidthR;

            for ( winDoorNo = 0; winDoorNo < aWinDoorSetSpec.no_of_winDoors; winDoorNo ++ ) {
                //console.log("winDoorNo: ", winDoorNo);

                // Find 8 corners:

                winDoor_center_tangentPlane = new TangentPlane(
                    aWinDoorSetSpec.winDoor_azimuth_posCenter_in_radians[winDoorNo],
                    aWinDoorSetSpec.winDoor_polar_posCenter_in_radians[winDoorNo],
                    aSurface
                );

                // Find azimuth values in radians
                // Outer corners:

                // Upper left corner:




/*
                thetaR_tangentV = new THREE.Vector3(delta_X_from_thetaR, delta_Y_from_thetaR, delta_Z_from_thetaR).normalize();
                console.log("thetaR_tangentV: ", thetaR_tangentV);


                // horizontalSurfaceProjection (phiR_start, thetaR_start, projectionDistance, approximationPrecision, maxRecursionDepth)
                winDoor_polar_posStart_in_radians = aSurface.verticalSurfaceProjection(
                    aWinDoorSetSpec.winDoor_azimuth_posCenter_in_radians[winDoorNo],
                    aDelimitation.thetaR_min,
                    aWinDoorSetSpec.winDoor_polar_posCenter_in_radians[winDoorNo]);
                console.log("winDoor_polar_posStart_in_radians: ", winDoor_polar_posStart_in_radians);

                halfWidthCM = aWinDoorSetSpec.winDoor_extent_along_azimuth_in_centimeters[winDoorNo] / 2;
                console.log("halfWidthCM: ", halfWidthCM);


                halfWidthR  = aSurface.horizontalSurfaceProjection(
                    aWinDoorSetSpec.winDoor_azimuth_posCenter_in_radians[winDoorNo],
                    winDoor_polar_posStart_in_radians,
                    halfWidthCM);
                console.log("halfWidthR: ", halfWidthR);
*/

                // Inner corners:

                // Find polar values in radians
                // Outer corners:

                // Inner corners:

                // Put values in two arrays:

                // Instantiate WinDoor object:
            }

            //THIS CONSTRUCTOR REALLY SHOULD RETURN SOMETHING

            Object.freeze(this);
        };

        Object.freeze(WinDoorSet);
        return WinDoorSet;

    }
);